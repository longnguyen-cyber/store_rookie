import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/common';
import { PublisherRepository } from './publisher.repository';

describe('PublisherRepository', () => {
  let repo: PublisherRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherRepository,
        {
          provide: PrismaService,
          useValue: {
            publisher: {
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

    repo = module.get<PublisherRepository>(PublisherRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all publishers', async () => {
      const result = [];
      jest.spyOn(prisma.publisher, 'findMany').mockResolvedValue(result);
      expect(await repo.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one publisher', async () => {
      const result = {
        id: '1',
        name: 'Test Publisher',
        address: 'Test Address',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.publisher, 'findUnique').mockResolvedValue(result);
      expect(await repo.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a publisher', async () => {
      const publisherData = {
        id: 'mock-id',
        name: 'Test Publisher',
        address: 'Test Address',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.publisher, 'create').mockResolvedValue(publisherData);
      const createdPublisher = await repo.create(publisherData);
      expect(createdPublisher).toEqual(publisherData);
    });
  });

  describe('update', () => {
    it('should update a publisher', async () => {
      const publisherData = {
        id: '1',
        name: 'Updated Publisher',
        address: 'Updated Address',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.publisher, 'update').mockResolvedValue(publisherData);
      expect(await repo.update('1', publisherData)).toBe(publisherData);
    });
  });

  describe('delete', () => {
    it('should delete a publisher', async () => {
      const result = {
        id: '1',
        name: 'Test Publisher',
        address: 'Test Address',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      jest.spyOn(prisma.publisher, 'delete').mockResolvedValue(result);
      expect(await repo.delete('1')).toBe(result);
    });
  });
});
