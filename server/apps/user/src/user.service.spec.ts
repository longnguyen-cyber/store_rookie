import { AuthService } from '@app/auth/auth.service';
import { CACHE_SERVICE } from '@app/cache';
import { CommonService } from '@app/common';
import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { UserCheck } from './user.check';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
export const mockBullQueue: any = {
  add: jest.fn(),
  process: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  let authService: AuthService;
  let cacheManager: any;
  let commonService: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
          },
        },
        {
          provide: UserCheck,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {
            hashPassword: jest.fn(),
            generateJWT: jest.fn(),
          },
        },
        {
          provide: CACHE_SERVICE,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: CommonService,
          useValue: {
            deleteField: jest.fn(),
          },
        },
        {
          provide: getQueueToken('queue'),
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    service = await module.resolve<UserService>(UserService);
    authService = await module.resolve<AuthService>(AuthService);
    cacheManager = module.get(CACHE_SERVICE);
    commonService = module.get(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const result = {
        email: 'longnguyendev2020@gmail.com',
        username: 'longnguyendev',
        password: 'password',
      };

      jest.spyOn(service, 'createUser').mockResolvedValue(true);
      expect(await service.createUser(result, 'http://localhost:3000')).toBe(
        true,
      );
    });
  });

  describe('verifyUser', () => {
    it('should verify a user with wrong token', async () => {
      const token = 'mock';
      const user = {
        email: 'longnguyendev2020@gmail.com',
        username: 'longnguyendev',
        password: 'password',
      };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(JSON.stringify(user));
      jest.spyOn(authService, 'hashPassword').mockResolvedValue('password');
      jest.spyOn(service, 'createUser').mockResolvedValue(user as any);
      jest.spyOn(cacheManager, 'del').mockResolvedValue(true);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(true);
      jest.spyOn(commonService, 'deleteField').mockResolvedValue(user);
      expect(await service.verifyUser(token)).toBe(false);
    });
  });

  describe('logout', () => {
    it('should logout a user', async () => {
      const token = 'mock';
      jest.spyOn(cacheManager, 'del').mockResolvedValue(true);
      expect(await service.logout(token)).toBe(true);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const user = {
        email: '01635080905l@gmail.com',
        password: '1234567',
      };
      const token = 'token';

      jest.spyOn(service, 'checkLoginData').mockResolvedValue(user);
      jest.spyOn(authService, 'generateJWT').mockReturnValue(token);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(true);
      jest.spyOn(commonService, 'deleteField').mockResolvedValue(user);
      expect(await service.login(user)).toEqual({
        user,
        token,
      });
    });
  });
});
