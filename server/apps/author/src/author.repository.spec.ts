import { Test, TestingModule } from '@nestjs/testing';
import { AuthorRepository } from './author.repository';
import { PrismaMock, PrismaService } from '@app/common';

describe('AuthorRepository', () => {
  let repo: AuthorRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorRepository,
        {
          provide: PrismaService,
          useValue: PrismaMock,
        },
      ],
    }).compile();

    repo = module.get<AuthorRepository>(AuthorRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const result = [];
      jest.spyOn(prisma.author, 'findMany').mockResolvedValue(result);
      expect(await repo.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one author', async () => {
      const result = {
        id: '1',
        name: 'Test Author',
        bio: 'Test Bio',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.author, 'findUnique').mockResolvedValue(result);
      expect(await repo.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create an author', async () => {
      const authorData = {
        id: 'mock-id',
        name: 'Test Author',
        bio: 'Test Bio',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.author, 'create').mockResolvedValue(authorData);
      const createdAuthor = await repo.create({
        name: 'Test Author',
        bio: 'Test Bio',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
      expect(createdAuthor).toEqual(authorData);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const authorData = {
        id: '1',
        name: 'Updated Author',
        bio: 'Updated Bio',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.author, 'update').mockResolvedValue(authorData);
      expect(await repo.update('1', authorData)).toBe(authorData);
    });
  });

  describe('delete', () => {
    it('should delete an author', async () => {
      const result = {
        id: '1',
        name: 'Test Author',
        bio: 'Test Bio',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      jest.spyOn(prisma.author, 'delete').mockResolvedValue(result);
      expect(await repo.delete('1')).toBe(result);
    });
  });

  describe('search', () => {
    it('should search for authors', async () => {
      const result = [];
      jest.spyOn(prisma.author, 'findMany').mockResolvedValue(result);
      expect(await repo.search('test')).toBe(result);
    });
  });
});
