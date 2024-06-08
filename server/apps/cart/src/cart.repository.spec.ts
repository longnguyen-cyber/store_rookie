import { PrismaMock, PrismaService, Role } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
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
          useValue: PrismaMock,
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

      const result = await repo.getCart('user1');
      expect(findFirstSpy).toHaveBeenCalledWith({
        where: {
          OR: [{ userId: 'user1' }, { guestId: 'user1' }],
        },
        include: {
          items: {
            include: {
              book: {
                include: {
                  authors: {
                    include: {
                      author: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                  category: true,
                  prices: true,
                },
              },
            },
          },
        },
      });

      expect(result).toEqual({
        id: 'cart1',
        userId: 'user1',
        guestId: null,
        items: [],
        total: '0.00',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });

  describe('addItemToCart', () => {
    it('should add item to cart', async () => {
      const userId = 'user1';
      const data = {
        book: {
          connect: {
            id: 'book1',
          },
        },
        quantity: 1,
      };
      const dataRaw = {
        id: '1',
        items: [data],
        type: 'User',
      };

      prisma.cart.findFirst = jest.fn().mockResolvedValue({ id: '1' });
      prisma.book.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 'book1', quantity: 10 });
      prisma.cartItem.create = jest.fn().mockResolvedValue(true);

      const result = await repo.addItemToCart(data, userId, Role.User);

      expect(result).toBe(true);
      expect(prisma.cart.findFirst).toBeCalledWith({
        where: { userId },
      });
      expect(prisma.book.findUnique).toBeCalledWith({
        where: { id: dataRaw.items[0].book.connect.id },
        select: { quantity: true },
      });
      expect(prisma.cartItem.create).toBeCalled();
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove item from cart', async () => {
      const id = 'cart1';
      prisma.cartItem.delete = jest.fn().mockResolvedValue(true);

      const result = await repo.removeItemFromCart(id);

      expect(result).toBe(true);
      expect(prisma.cartItem.delete).toBeCalledWith({
        where: { id },
      });
    });
  });

  describe('updateQuantityOfItem', () => {
    it('should update quantity of item', async () => {
      const id = 'cart1';
      const quantity = 2;
      prisma.cartItem.findUnique = jest.fn().mockResolvedValue({
        id: 'cart1',
        book: {
          quantity: 10,
        },
      });
      prisma.cartItem.update = jest.fn().mockResolvedValue(true);

      const result = await repo.updateQuantityOfItem(id, quantity);

      expect(result).toBe(true);
      expect(prisma.cartItem.findUnique).toBeCalledWith({
        where: { id },
        include: {
          book: {
            select: { quantity: true },
          },
        },
      });
      expect(prisma.cartItem.update).toBeCalledWith({
        where: { id },
        data: { quantity },
      });
    });

    it('should throw error when quantity is not sufficient', async () => {
      const id = 'cart1';
      const quantity = 20;
      prisma.cartItem.findUnique = jest.fn().mockResolvedValue({
        id: 'cart1',
        book: {
          quantity: 10,
        },
      });

      try {
        await repo.updateQuantityOfItem(id, quantity);
      } catch (error) {
        expect(error.message).toBe(
          'Quantity of book is not enough just 10 left',
        );
      }
    });
  });
});
