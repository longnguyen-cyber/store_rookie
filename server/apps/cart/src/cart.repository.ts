import { PrismaService, Role } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create only when click add item, if checkout cart and add more item will get old cart and create new item cart
  private async createCart(dataRaw: any) {
    const data = {
      guestId: dataRaw.guestId,
      items: {
        createMany: {
          data: dataRaw.items.map((item: any) => {
            const bookId = item.book.connect.id;
            delete item.book;
            return {
              ...item,
              bookId,
            };
          }),
        },
      },
    };
    const cart = await this.prisma.cart.create({
      data,
    });

    return cart ? true : false;
  }

  async addItemToCart(data: any, userId: string, type: Role) {
    const cartExist = await this.findCart(userId, type);

    if (cartExist) {
      const db = {
        ...data,
        cart: {
          connect: {
            id: cartExist.id,
          },
        },
      };

      const cart = await this.prisma.cartItem.create({
        data: {
          ...db,
        },
      });

      return cart ? true : false;
      // console.log('db', db);
      // return false;
    } else {
      delete data.cart;
      const dataCart = {
        guestId: userId,
        items: [data],
      };
      const cart = await this.createCart(dataCart);
      return cart ? true : false;
    }
  }

  async removeItemFromCart(id: string) {
    const cart = await this.prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    return cart ? true : false;
  }

  async updateQuantityOfItem(id: string, quantity: number) {
    const cart = await this.prisma.cartItem.update({
      where: {
        id: id,
      },
      data: {
        quantity: quantity,
      },
    });

    return cart ? true : false;
  }

  async getCart(id: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        OR: [
          {
            userId: id,
          },
          {
            guestId: id,
          },
        ],
      },
      include: {
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
    if (!cart) return [];

    const items = await Promise.all(
      cart.items.map(async (item) => {
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
      ...cart,
      items,
      total: total.toFixed(2),
    };
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
