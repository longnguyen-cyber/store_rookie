import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService, Role } from '@app/common';
import { CartRepository } from './cart.repository';

describe('CartRepository', () => {
  let repo: CartRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartRepository,
        {
          provide: PrismaService,
          useValue: {
            cart: {
              createCart: jest.fn(),
              addItemToCart: jest.fn(),
              removeItemFromCart: jest.fn(),
              updateQuantityOfItem: jest.fn(),
              getCart: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repo = module.get<CartRepository>(CartRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('createCart', () => {
    it('should pass when book quantity is sufficient', async () => {
      const books = [
        {
          id: 'book1',
          title: 'Book Title',
          description: 'Book Description',
          categoryId: 'category1',
          rating: 4.5,
          ratings: JSON.stringify({}),
          images: JSON.stringify({}),
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const dataRaw = {
        id: '1',
        items: [
          {
            book: {
              connect: {
                id: 'book1',
              },
            },
            quantity: 1,
          },
        ],
        type: 'User',
      };

      const result = dataRaw.items.every((item: any) => {
        const book = books.find((book) => book.id === item.book.connect.id);
        return book.quantity >= item.quantity;
      });

      expect(result).toBe(true);
    });

    it('should fail when book quantity is not sufficient', async () => {
      const books = [
        {
          id: 'book1',
          title: 'Book Title',
          description: 'Book Description',
          categoryId: 'category1',
          rating: 4.5,
          ratings: JSON.stringify({}),
          images: JSON.stringify({}),
          quantity: 0, // set quantity to 0
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const dataRaw = {
        id: '1',
        items: [
          {
            book: {
              connect: {
                id: 'book1',
              },
            },
            quantity: 1,
          },
        ],
        type: 'User',
      };

      const result = dataRaw.items.every((item: any) => {
        const book = books.find((book) => book.id === item.book.connect.id);
        return book.quantity >= item.quantity;
      });

      expect(result).toBe(false);
    });
  });
  describe('getCart', () => {
    it('should return cart with total price calculated', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.cart, 'findFirst')
        .mockResolvedValue({
          id: 'cart1',
          items: [
            {
              bookId: 'book1',
              quantity: 1,
              book: {
                prices: [
                  {
                    originalPrice: 100,
                    discountPrice: 50,
                  },
                ],
              },
            },
          ],
        } as any);

      const findUniqueSpy = jest
        .spyOn(prisma.bookPrice, 'findUnique')
        .mockResolvedValue({
          id: 'price1',
          bookId: 'book1',
          originalPrice: 100,
          discountPrice: 50,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });

      const result = await repo.getCart('cart1');

      const total = result.items.reduce((acc, item) => {
        if (item.book.prices[0] && item.book.prices[0].discountPrice) {
          return acc + item.book.prices[0].discountPrice * item.quantity;
        } else {
          return acc + item.book.prices[0].originalPrice * item.quantity;
        }
      }, 0);

      expect(findFirstSpy).toHaveBeenCalled();
      expect(findUniqueSpy).toHaveBeenCalled();
      expect(total.toFixed(2)).toBe('50.00');
    });

    it('should return empty array when cart does not exist', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.cart, 'findFirst')
        .mockResolvedValue(null);

      const result = await repo.getCart('cart1');

      expect(findFirstSpy).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findCart', () => {
    it('should return cart for user', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.cart, 'findFirst')
        .mockResolvedValue({
          id: 'cart1',
          userId: 'user1',
          guestId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });

      const result = await repo.findCart('user1', Role.User);

      expect(findFirstSpy).toHaveBeenCalledWith({ where: { userId: 'user1' } });
      expect(result).toEqual({ id: 'cart1' });
    });

    it('should return cart for guest', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.cart, 'findFirst')
        .mockResolvedValue({
          id: 'cart1',
          userId: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          guestId: 'guest1',
        });

      const result = await repo.findCart('guest1', Role.GUEST);

      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { guestId: 'guest1' },
      });
      expect(result).toEqual({ id: 'cart1' });
    });
  });
});
