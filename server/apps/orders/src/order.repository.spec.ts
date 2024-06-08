import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from './order.repository';
import { PrismaMock, PrismaService, Role } from '@app/common';

describe('OrderRepository', () => {
  let repo: OrderRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRepository,
        {
          provide: PrismaService,
          useValue: PrismaMock,
        },
      ],
    }).compile();

    repo = module.get<OrderRepository>(OrderRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const result = [];
      jest.spyOn(prisma.order, 'findMany').mockResolvedValue(result);
      expect(await repo.findAll()).toStrictEqual(result);
    });
  });

  describe('getAllOrderCompletedOfBook', () => {
    it('should return all books that have been ordered', async () => {
      const result = [
        {
          id: '1',
          title: 'Test Book',
          authorId: 'author1',
          categoryId: 'category1',
          publisherId: 'publisher1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      jest.spyOn(prisma.order, 'findMany').mockResolvedValue([
        {
          id: '1',
          status: 'Completed',
          items: [
            {
              book: result[0],
            },
          ],
        },
      ] as any);
      expect(await repo.getAllOrderCompletedOfBook()).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return one order', async () => {
      const result = {
        id: '1',
        userId: 'user1',
        orderDate: new Date(),
        status: 'Pending',
        payment: 'cash',
        isPayment: false,
        address: 'Test Address',
        total: '0.00',
        items: [],
        shipping: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(result);

      expect(await repo.findOne('1')).toStrictEqual(result);
    });

    it('should return null if order not found', async () => {
      jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(null);

      expect(await repo.findOne('1')).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const result = {
        id: '1',
        userId: 'user1',
        orderDate: new Date(),
        status: 'Pending',
        payment: 'cash',
        isPayment: false,
        address: 'Test Address',
        shipping: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prisma.order, 'update').mockResolvedValue(result);

      expect(await repo.update('1', result)).toStrictEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete an order', async () => {
      const result = {
        id: '1',
        userId: 'user1',
        orderDate: new Date(),
        status: 'Pending',
        payment: 'cash',
        isPayment: false,
        address: 'Test Address',
        shipping: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      jest.spyOn(prisma.order, 'delete').mockResolvedValue(result);

      expect(await repo.delete('1')).toStrictEqual(result);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      const orderData = {
        id: 'mock-id',
        userId: 'user1',
        orderDate: new Date(),
        status: 'Pending',
        payment: 'cash',
        isPayment: false,
        address: 'Test Address',
        total: '0.00',
        items: [],
        shipping: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const data = {
        ...orderData,
        status: 'completed',
        user: {
          connect: {
            id: 'user1',
          },
        },
      };

      const mockCart = {
        id: 'cart1',
        userId: null,
      };

      jest.spyOn(prisma.order, 'create').mockResolvedValue(orderData);
      jest.spyOn(repo, 'findCart').mockResolvedValue(mockCart);
      jest.spyOn(prisma.cart, 'update');
      jest.spyOn(prisma.cartItem, 'deleteMany').mockResolvedValue({ count: 1 });

      const createdOrder = await repo.create(data, 'guest1');

      expect(createdOrder).toEqual(orderData);
      expect(prisma.order.create).toHaveBeenCalledWith({
        data: {
          ...data,
          status: 'completed',
        },
      });
      expect(repo.findCart).toHaveBeenCalledWith('guest1', Role.GUEST);
      expect(prisma.cart.update).toHaveBeenCalledWith({
        where: { id: mockCart.id },
        data: { userId: data.user.connect.id },
      });
    });
  });
});
