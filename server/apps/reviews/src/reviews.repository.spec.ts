import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/common';
import { ReviewRepository } from './reviews.repository';

describe('ReviewRepository', () => {
  let repo: ReviewRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewRepository,
        {
          provide: PrismaService,
          useValue: {
            review: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repo = module.get<ReviewRepository>(ReviewRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all reviews', async () => {
      const result = [];
      jest.spyOn(prisma.review, 'findMany').mockResolvedValue(result);
      expect(await repo.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one review', async () => {
      const result = {
        id: '1',
        bookId: 'book1',
        userId: 'user1',
        rating: 5,
        title: 'Test Review',
        status: true,
        content: 'This is a test review',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.review, 'findUnique').mockResolvedValue(result);
      expect(await repo.findOne('1')).toBe(result);
    });
  });

  //missing case check user have buy book or not
  // describe('create', () => {
  //   it('should create a review', async () => {
  //     const reviewData = {
  //       id: 'mock-id',
  //       bookId: 'book1',
  //       userId: 'user1',
  //       rating: 5,
  //       title: 'Test Review',
  //       status: true,
  //       content: 'This is a test review',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       deletedAt: null,
  //     };
  //     jest.spyOn(prisma.review, 'create').mockResolvedValue(reviewData);
  //     const createdReview = await repo.create(reviewData);
  //     expect(createdReview).toEqual(reviewData);
  //   });
  // });

  describe('update', () => {
    it('should update a review', async () => {
      const reviewData = {
        id: '1',
        bookId: 'book1',
        userId: 'user1',
        rating: 4,
        title: 'Updated Review',
        status: true,
        content: 'This is an updated test review',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.review, 'update').mockResolvedValue(reviewData);
      expect(await repo.update('1', reviewData)).toBe(reviewData);
    });
  });

  describe('delete', () => {
    it('should delete a review', async () => {
      const result = {
        id: '1',
        bookId: 'book1',
        userId: 'user1',
        rating: 5,
        title: 'Test Review',
        status: true,
        content: 'This is a test review',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      jest.spyOn(prisma.review, 'delete').mockResolvedValue(result);
      expect(await repo.delete('1')).toBe(result);
    });
  });
});
