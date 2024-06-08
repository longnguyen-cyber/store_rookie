import { Test, TestingModule } from '@nestjs/testing';
import { PrismaMock, PrismaService } from '@app/common';
import { PromotionRepository } from './promotions.repository';

describe('PromotionRepository', () => {
  let repo: PromotionRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionRepository,
        {
          provide: PrismaService,
          useValue: PrismaMock,
        },
      ],
    }).compile();

    repo = module.get<PromotionRepository>(PromotionRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all promotions', async () => {
      const result = [];
      jest.spyOn(prisma.promotion, 'findMany').mockResolvedValue(result);
      expect(await repo.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one promotion', async () => {
      const result = {
        id: '1',
        bookId: 'book1',
        promotionType: 'type1',
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.promotion, 'findUnique').mockResolvedValue(result);
      expect(await repo.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a promotion', async () => {
      const promotionData = {
        id: 'mock-id',
        bookId: 'book1',
        promotionType: 'type1',
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.promotion, 'create').mockResolvedValue(promotionData);
      const createdPromotion = await repo.create(promotionData);
      expect(createdPromotion).toEqual(promotionData);
    });
  });

  describe('update', () => {
    it('should update a promotion', async () => {
      const promotionData = {
        id: '1',
        bookId: 'book1',
        promotionType: 'type1',
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.promotion, 'update').mockResolvedValue(promotionData);
      expect(await repo.update('1', promotionData)).toBe(promotionData);
    });
  });

  describe('delete', () => {
    it('should delete a promotion', async () => {
      const result = {
        id: '1',
        bookId: 'book1',
        promotionType: 'type1',
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.promotion, 'delete').mockResolvedValue(result);
      expect(await repo.delete('1')).toBe(result);
    });
  });

  describe('search', () => {
    it('should search promotions', async () => {
      const result = [];
      jest.spyOn(prisma.promotion, 'findMany').mockResolvedValue(result);
      expect(await repo.search(new Date(), new Date())).toBe(result);
    });
  });
});
