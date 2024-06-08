import { CACHE_SERVICE } from '@app/cache';
import { CommonService, HttpExceptionCustom } from '@app/common';
import { LoginInput } from '@app/common/user';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { UserCheck } from './user.check';
import { UserRepository } from './user.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue as QueueEmail } from 'bull';
import { AuthService } from '@app/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private userCheck: UserCheck,
    private authService: AuthService,
    @Inject(CACHE_SERVICE) private cacheManager: Cache,
    private readonly configService: ConfigService,
    @InjectQueue('queue')
    private readonly mailQueue: QueueEmail,
    private readonly commonService: CommonService,
  ) {}

  private readonly LOGIN_EXPIRED = 60 * 60 * 24 * 30; // 30 days

  async login({ email, password }: any): Promise<any> {
    const user = await this.checkLoginData(email.trim(), password);

    const token = this.authService.generateJWT(email);
    await this.cacheManager.set(token, JSON.stringify(user), {
      ttl: this.LOGIN_EXPIRED,
    }); // 30 days
    this.commonService.deleteField(user, ['']);
    return {
      user,
      token,
    };
  }

  async createUser(userCreateDto: any, host: string) {
    const userClean = { ...userCreateDto };
    const { email } = userClean;

    this.cacheManager.set(email, true, {
      //15minutes
      ttl: 60 * 15,
    }); //expires in 15 minutes

    const accessToken = this.authService.generateJWTRegister(email); //expires in 15 minutes
    if (userClean) {
      this.cacheManager.set(accessToken, JSON.stringify(userClean), {
        ttl: this.configService.get<number>('REGISTER_2FA_EXPIRED'),
      }); //15 minutes for verify email register
      await this.mailQueue.add(
        'register',
        {
          to: userClean.email,
          name: userClean.name,
          link: `${host}/auth/verify-email?token=${accessToken}`,
        },
        {
          removeOnComplete: true,
        },
      );
      return true;
    }
    return false;
  }

  async verifyUser(token: string) {
    const user = await this.cacheManager.get(token);
    if (user) {
      const userParsed = JSON.parse(user as any);
      const passwordHashed = await this.authService.hashPassword(
        userParsed.password,
      );

      const data = {
        ...userParsed,
        password: passwordHashed,
      };

      const userCreated = await this.userRepository.createUser(data);
      if (userCreated) {
        this.cacheManager.del(token);
        this.cacheManager.del(userParsed.email);
        const accessToken = this.authService.generateJWT(userCreated.email);
        this.cacheManager.set(accessToken, JSON.stringify(userCreated), {
          ttl: this.LOGIN_EXPIRED,
        }); // 30 days

        return this.commonService.deleteField(
          {
            ...userCreated,
            token: accessToken,
          },
          [],
        );
      }
    }
    return false;
  }

  async logout(token: string): Promise<boolean> {
    await this.cacheManager.del(token);
    return true;
  }

  private async checkLoginData(
    email: string,
    password: string,
  ): Promise<LoginInput> {
    try {
      await this.checkEmailExist(email);

      const user = await this.userRepository.findByEmail(email);
      await this.checkValidatePassword(password, user.password);

      return user;
    } catch (e) {
      throw new HttpExceptionCustom(
        'email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async checkEmailExist(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    this.userCheck.isExistUser(!!user);
  }

  private async checkValidatePassword(
    passwordLeft: string,
    passwordRight: string,
  ): Promise<void> {
    let isValid: boolean;

    if (!passwordLeft && !passwordRight) {
      isValid = false;
    }
    isValid = await this.authService.validatePassword(
      passwordLeft,
      passwordRight,
    );
    this.userCheck.isValidPassword(isValid);
  }
}
