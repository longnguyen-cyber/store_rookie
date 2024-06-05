import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from './categories.repository';
import { PrismaService } from '@app/common';

describe('CategoriesRepository', () => {
  let repo: CategoriesRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesRepository,
        {
          provide: PrismaService,
          useValue: {
            category: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              search: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repo = module.get<CategoriesRepository>(CategoriesRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const result = [];
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(result);
      expect(await repo.findAll()).toBe(result);
    });
  });

  describe('getBookByCategory', () => {
    it('should return books by category', async () => {
      const result = [];
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(result);
      expect(await repo.getBookByCategory('test')).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one category', async () => {
      const result = {
        id: '1',
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(result);
      expect(await repo.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a category', async () => {
      const categoryData = {
        id: 'mock-id', // Add this line
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.category, 'create').mockResolvedValue(categoryData);
      const createdCategory = await repo.create({
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
      expect(createdCategory).toEqual(categoryData);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryData = {
        id: '1',
        name: 'Updated Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.category, 'update').mockResolvedValue(categoryData);
      expect(await repo.update('1', categoryData)).toBe(categoryData);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const result = {
        id: '1',
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      jest.spyOn(prisma.category, 'delete').mockResolvedValue(result);
      expect(await repo.delete('1')).toBe(result);
    });
  });

  describe('search', () => {
    it('should search for categories', async () => {
      const result = [];
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(result);
      expect(await repo.search('test')).toBe(result);
    });
  });
});
