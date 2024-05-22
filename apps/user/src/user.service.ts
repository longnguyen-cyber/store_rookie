import { CommonService, HttpExceptionCustom } from '@app/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'apps/auth/src/auth.service';
import { Cache } from 'cache-manager';
import { UserCheck } from './user.check';
import { UserRepository } from './user.repository';
import { LoginInput } from '@app/common/user';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private userCheck: UserCheck,
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {}

  async login({ email, password }: any): Promise<any> {
    const user = await this.checkLoginData(email.trim(), password);

    const token = this.authService.generateJWT(email);
    await this.cacheManager.set(token, JSON.stringify(user), {
      ttl: this.configService.get<number>('LOGIN_EXPIRED'),
    }); // 30 days
    this.commonService.deleteField(user, ['userId']);
    return {
      ...user,
      token,
    };
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
