import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from './order.repository';
import { PrismaMock, PrismaService } from '@app/common';

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

  // async create(data: any, guestId: string) {
  //   const order = await this.prisma.order.create({
  //     data: {
  //       ...data,
  //       status: ORDER_STATUS.COMPLETED,
  //     },
  //   });
  //   //update info guest->user cart after order
  //   const cart = await this.findCart(guestId, Role.GUEST);
  //   if (cart.userId == null) {
  //     await this.prisma.cart.update({
  //       where: {
  //         id: cart.id,
  //       },
  //       data: {
  //         userId: data.user.connect.id,
  //       },
  //     });
  //     console.log('update info guest->user cart after order');
  //   }

  //   if (order.status === ORDER_STATUS.COMPLETED) {
  //     //detete cart item after order
  //     await this.prisma.cartItem.deleteMany({
  //       where: {
  //         cartId: cart.id,
  //       },
  //     });
  //     console.log('delete cart item after order');
  //   }
  //   return order;
  // }

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
      jest.spyOn(prisma.order, 'create').mockResolvedValue(orderData);
      const createdOrder = await repo.create(orderData, 'guest1');
      expect(createdOrder).toEqual(orderData);
    });
  });
});
