import { Test } from '@nestjs/testing';
import { BookResolver } from './books.resolver';
import { BookService } from './books.service';
import { BookRepository } from './books.repository';

describe('BookResolver', () => {
  let bookResolver: BookResolver;
  let bookService: BookService;
  let bookRepository: BookRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookResolver,
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: BookRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    bookResolver = moduleRef.get<BookResolver>(BookResolver);
    bookService = moduleRef.get<BookService>(BookService);
    bookRepository = moduleRef.get<BookRepository>(BookRepository);
  });

  describe('findAll', () => {
    it('should return books', async () => {
      const booksExpected = [];
      jest.spyOn(bookService, 'findAll').mockResolvedValue(booksExpected);

      const books = await bookResolver.books('0', 'asc');

      expect(books).toBe(booksExpected);
    });
  });
});
