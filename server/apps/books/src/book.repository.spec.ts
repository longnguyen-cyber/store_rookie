import { PrismaMock, PrismaService } from '@app/common';
import { BookRepository } from './books.repository';
import { TestingModule, Test } from '@nestjs/testing';

describe('BookRepository', () => {
  let repo: BookRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookRepository,
        {
          provide: PrismaService,
          useValue: PrismaMock,
        },
      ],
    }).compile();

    repo = module.get<BookRepository>(BookRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('get all books for admin', () => {
    it('should return all books', async () => {
      const result = [];
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(result);
      expect(await repo.findAllAdmin()).toBe(result);
    });
  });

  describe('get books for cron rating', () => {
    it('should return books with reviews', async () => {
      const result = [];
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(result);
      expect(await repo.getBooksForCronRating()).toStrictEqual(result);
    });
  });

  describe('get books for cron price', () => {
    it('should return books with promotion', async () => {
      const result = [];
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(result);
      jest.spyOn(prisma.promotion, 'findMany').mockResolvedValue([]);
      expect(await repo.getBooksForCronPrice()).toStrictEqual(result);
    });
  });

  describe('find one book', () => {
    it('should return one book', async () => {
      const result = {
        id: '1',
        title: 'title1',
        authors: [
          {
            id: 'author1',
            name: 'authorName1',
          },
        ],
        category: {
          id: 'category1',
          name: 'categoryName1',
        },
        prices: [
          {
            id: 'price1',
            price: 100,
            startDate: new Date(),
            endDate: new Date(),
          },
        ],
        publishers: [
          {
            publisher: {
              id: 'publisher1',
              name: 'publisherName1',
            },
          },
        ],
      };
      jest.spyOn(prisma.book, 'findUnique').mockResolvedValue(result as any);
      expect(await repo.findOne('1')).toBe(result);
    });

    it('should return null if book not found', async () => {
      jest.spyOn(prisma.book, 'findUnique').mockResolvedValue(null);
      expect(await repo.findOne('1')).toBe(null);
    });
  });

  describe('create book', () => {
    it('should create a book', async () => {
      const bookData = {
        id: '1',
        title: 'title1',
        authors: [
          {
            id: 'author1',
            name: 'authorName1',
          },
        ],
        category: {
          id: 'category1',
          name: 'categoryName1',
        },
        prices: [
          {
            id: 'price1',
            price: 100,
            startDate: new Date(),
            endDate: new Date(),
          },
        ],
        publishers: [
          {
            publisher: {
              id: 'publisher1',
              name: 'publisherName1',
            },
          },
        ],
      };
      jest.spyOn(prisma.book, 'create').mockResolvedValue(bookData as any);
      const createdBook = await repo.create(bookData);
      expect(createdBook).toEqual(bookData);
    });

    it('should return null if book not created', async () => {
      jest.spyOn(prisma.book, 'create').mockResolvedValue(null);
      expect(await repo.create({})).toBe(null);
    });
  });

  describe('get recommend books by rating', () => {
    it('should return books with rating >= 4', async () => {
      const result = [];
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(result);
      expect(await repo.getRecommendBooksByRating()).toStrictEqual(result);
    });

    it('should return empty array if no books found', async () => {
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue([]);
      expect(await repo.getRecommendBooksByRating()).toStrictEqual([]);
    });
  });

  describe('update book', () => {
    it('should update a book and its price', async () => {
      const bookData = {
        id: '1',
        title: 'title1',
        description: 'description1',
      };

      const priceData = {
        bookId: '1',
        prices: 100,
        discountPrice: 80,
      };
      jest.spyOn(prisma.book, 'update').mockResolvedValue(bookData as any);

      jest
        .spyOn(prisma.bookPrice, 'findFirst')
        .mockResolvedValue(priceData as any);

      jest.spyOn(prisma.bookPrice, 'update');
      jest.spyOn(prisma.bookPrice, 'create');

      expect(await repo.update('1', bookData)).toBe(bookData);
    });

    it('should create a book price if it does not exist', async () => {
      const bookData = {
        id: '1',
        title: 'title1',
        description: 'description1',
      };

      jest.spyOn(prisma.book, 'update').mockResolvedValue(bookData as any);

      jest.spyOn(prisma.bookPrice, 'findFirst').mockResolvedValue(null);

      const createSpy = jest.spyOn(prisma.bookPrice, 'create');

      await repo.update('1', bookData);

      expect(createSpy).toHaveBeenCalled();
    });

    it('should return null if book not updated', async () => {
      jest.spyOn(prisma.book, 'update').mockResolvedValue(null);
      expect(await repo.update('1', {})).toBe(null);
    });
  });

  describe('delete book', () => {
    it('should delete a book', async () => {
      const result = {
        id: '1',
        title: 'title1',
        authors: [
          {
            id: 'author1',
            name: 'authorName1',
          },
        ],
        category: {
          id: 'category1',
          name: 'categoryName1',
        },
        prices: [
          {
            id: 'price1',
            price: 100,
            startDate: new Date(),
            endDate: new Date(),
          },
        ],
        publishers: [
          {
            publisher: {
              id: 'publisher1',
              name: 'publisherName1',
            },
          },
        ],
      };
      jest.spyOn(prisma.book, 'delete').mockResolvedValue(result as any);
      jest.spyOn(prisma.bookPrice, 'deleteMany');
      jest.spyOn(prisma.bookAuthor, 'deleteMany');
      jest.spyOn(prisma.bookPublisher, 'deleteMany');

      expect(await repo.delete('1')).toBe(result);
    });

    it('should return null if book not deleted', async () => {
      jest.spyOn(prisma.book, 'delete').mockResolvedValue(null);
      expect(await repo.delete('1')).toBe(null);
    });
  });

  describe('search books', () => {
    it('should return books with title or description contains q', async () => {
      const result = [
        {
          id: '1',
          title: 'title1',
          authors: [
            {
              id: 'author1',
              name: 'authorName1',
            },
          ],
          category: {
            id: 'category1',
            name: 'categoryName1',
          },
          prices: [
            {
              id: 'price1',
              price: 100,
              startDate: new Date(),
              endDate: new Date(),
            },
          ],
          publishers: [
            {
              publisher: {
                id: 'publisher1',
                name: 'publisherName1',
              },
            },
          ],
        },
      ];
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(result as any);
      expect(await repo.search('title1')).toStrictEqual(result);
    });

    it('should return empty array if no books found', async () => {
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue([]);
      expect(await repo.search('q')).toStrictEqual([]);
    });
  });

  describe('find by filter', () => {
    it('should return books with filter', async () => {
      const count = 1;
      jest.spyOn(repo, 'countBook').mockResolvedValue(count);
      // Ensure the mock data is correctly set up
      const result = [
        {
          id: '1',
          title: 'title1',
          description: 'description1',
          prices: [
            {
              id: 'price1',
              price: 100,
              startDate: new Date(),
              endDate: new Date(),
            },
          ],
        },
      ];

      jest.spyOn(repo, 'findByFilter').mockResolvedValue({
        books: result,
        total: count,
      });

      const books = await repo.findByFilter({});
      expect(books).toStrictEqual({
        books: result,
        total: count,
      });
    });
    it('should return books with filter rating', async () => {
      const count = 1;
      jest.spyOn(repo, 'countBook').mockResolvedValue(count);
      const result = [
        {
          id: '1',
          title: 'title1',
          description: 'description1',
          rating: 4,
          prices: [
            {
              id: 'price1',
              price: 100,
              startDate: new Date(),
              endDate: new Date(),
            },
          ],
        },
      ];

      jest.spyOn(repo, 'findByFilter').mockResolvedValue({
        books: result,
        total: count,
      });

      const books = await repo.findByFilter({ rating: ['3'] });
      expect(books).toStrictEqual({
        books: result,
        total: count,
      });
    });

    it('should return empty array if no books found', async () => {
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue([]);
      expect(await repo.findByFilter({})).toStrictEqual({
        books: [],
        total: undefined,
      });
    });
  });
});
