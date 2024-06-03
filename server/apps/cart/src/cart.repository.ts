import { PrismaService, Role } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create only when click add item, if checkout cart and add more item will get old cart and create new item cart
  private async createCart(dataRaw: any) {
    const quantityOfBook = await this.prisma.book.findMany({
      where: {
        id: {
          in: dataRaw.items.map((item: any) => item.book.connect.id),
        },
      },
      select: {
        id: true,
        quantity: true,
      },
    });
    console.log('quantityOfBook', quantityOfBook);

    const checkQuantity = dataRaw.items.every((item: any) => {
      const book = quantityOfBook.find(
        (book) => book.id === item.book.connect.id,
      );
      return book.quantity >= item.quantity;
    });

    if (!checkQuantity)
      throw new Error(
        'Quantity of book is not enough just have ' +
          quantityOfBook[0].quantity +
          ' left',
      );
    const data = {
      userId: dataRaw.id,
      guestId: dataRaw.id,
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

    if (dataRaw.type === Role.User) delete data.guestId;
    if (dataRaw.type === Role.GUEST) delete data.userId;

    const cart = await this.prisma.cart.create({
      data,
    });

    return cart ? true : false;
  }

  async addItemToCart(data: any, userId: string, type: Role) {
    const cartExist = await this.findCart(userId, type);
    console.log('cartExist', cartExist);
    if (cartExist) {
      //check quantity of book
      const book = await this.prisma.book.findUnique({
        where: {
          id: data.book.connect.id,
        },
        select: {
          quantity: true,
        },
      });

      if (book.quantity < data.quantity)
        throw new Error(
          'Quantity of book is not enough just ' + book.quantity + ' left',
        );

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
    } else {
      delete data.cart;
      const dataCart = {
        id: userId,
        type: type,
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
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        id: id,
      },
      include: {
        book: {
          select: {
            quantity: true,
          },
        },
      },
    });

    if (cartItem.book.quantity < quantity)
      throw new Error(
        'Quantity of book is not enough just ' +
          cartItem.book.quantity +
          ' left',
      );

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
    if (type === Role.User) {
      const rs = await this.prisma.cart.findFirst({
        where: {
          userId: id,
        },
      });
      console.log('rs', rs);
      return rs;
    } else if (type === Role.GUEST) {
      return await this.prisma.cart.findFirst({
        where: {
          guestId: id,
        },
      });
    }
  }
}
