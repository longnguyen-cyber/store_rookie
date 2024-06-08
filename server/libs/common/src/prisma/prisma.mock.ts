import * as jest from 'jest-mock';
// enable this line if you want to run dev

export const PrismaMock = {
  cart: {
    createCart: jest.fn(),
    addItemToCart: jest.fn(),
    removeItemFromCart: jest.fn(),
    updateQuantityOfItem: jest.fn(),
    getCart: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  bookPrice: {
    findUnique: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  book: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    delete: jest.fn(),
  },
  cartItem: {
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
  },
  author: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  },
  bookAuthor: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  category: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
    deleteMany: jest.fn(),
  },
  promotion: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
    deleteMany: jest.fn(),
  },
  publisher: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  },
  bookPublisher: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  review: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },

  order: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
    findMany: jest.fn(),
  },
};