import { ORDER_STATUS, PrismaService, Role } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            book: {
              include: {
                prices: true,
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
              },
            },
          },
        },
      },
    });

    const final = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.items.map(async (item) => {
            const bookPrice = await this.prisma.bookPrice.findUnique({
              where: {
                bookId: item.bookId,
                id: item.priceId,
              },
            });
            return {
              ...item,
              book: {
                ...item.book,
                prices: [bookPrice],
              },
            };
          }),
        );
        const total = items.reduce((acc, item) => {
          if (item.book.prices[0] && item.book.prices[0].discountPrice) {
            return acc + item.book.prices[0].discountPrice * item.quantity;
          } else {
            return acc + item.book.prices[0].originalPrice * item.quantity;
          }
        }, 0);
        return {
          ...order,
          items,
          total: total.toFixed(2),
        };
      }),
    );
    return final;
  }

  async getAllOrderCompletedOfBook() {
    const orders = await this.prisma.order.findMany({
      where: {
        status: 'Completed',
      },
      include: {
        items: {
          select: {
            book: true,
          },
        },
      },
    });
    const books = orders.flatMap((order) =>
      order.items.map((item) => item.book),
    );

    const distinctBooks = books.reduce((unique, book) => {
      return unique.some((u) => u.id === book.id) ? unique : [...unique, book];
    }, []);

    return distinctBooks;
  }
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        items: {
          include: {
            book: {
              include: {
                prices: true,
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
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    const items =
      order.items.length > 0
        ? await Promise.all(
            order.items.map(async (item) => {
              const bookPrice = await this.prisma.bookPrice.findUnique({
                where: {
                  bookId: item.bookId,
                  id: item.priceId,
                },
              });
              return {
                ...item,
                book: {
                  ...item.book,
                  prices: [bookPrice],
                },
              };
            }),
          )
        : [];

    const total = items.reduce((acc, item) => {
      if (item.book.prices[0] && item.book.prices[0].discountPrice) {
        return acc + item.book.prices[0].discountPrice * item.quantity;
      } else {
        return acc + item.book.prices[0].originalPrice * item.quantity;
      }
    }, 0);

    return {
      ...order,
      items,
      total: total.toFixed(2),
    };
  }
  async create(data: any, guestId: string) {
    const order = await this.prisma.order.create({
      data: {
        ...data,
        status: ORDER_STATUS.COMPLETED,
      },
    });
    //update info guest->user cart after order
    const cart = await this.findCart(guestId, Role.GUEST);
    if (cart.userId == null) {
      await this.prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          userId: data.user.connect.id,
        },
      });
      console.log('update info guest->user cart after order');
    }

    if (order.status === ORDER_STATUS.COMPLETED) {
      //detete cart item after order
      await this.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
      console.log('delete cart item after order');
    }
    return order;
  }

  async update(id: string, data: any) {
    const order = await this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    console.log('update order', order);
    return order;
  }

  async delete(id: string) {
    const order = await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
    return order;
  }

  private async findCart(id: string, type: Role) {
    let cart = null;
    if (type === Role.User) {
      cart = await this.prisma.cart.findFirst({
        where: {
          userId: id,
        },
      });
    } else if (type === Role.GUEST) {
      cart = await this.prisma.cart.findFirst({
        where: {
          guestId: id,
        },
      });
    }

    return cart;
  }
}
