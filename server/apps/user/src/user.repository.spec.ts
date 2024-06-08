import { Test, TestingModule } from '@nestjs/testing';
import { PrismaMock, PrismaService } from '@app/common';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repo: UserRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: PrismaMock,
        },
      ],
    }).compile();

    repo = module.get<UserRepository>(UserRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const result = {
        id: '1',
        email: 'admin@admin.com',
        username: 'admin',
        password: 'password',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);
      expect(await repo.findByEmail('admin@admin.com')).toBe(result);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      expect(await repo.findByEmail('null@admin.com')).toBe(null);
    });
  });
  describe('create', () => {
    it('should create a user', async () => {
      const userData = {
        id: 'mock-id',
        email: 'mock@gmail.com',
        username: 'mock',
        password: 'password',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.user, 'create').mockResolvedValue(userData);
      expect(await repo.createUser(userData)).toBe(userData);
    });
  });
});
