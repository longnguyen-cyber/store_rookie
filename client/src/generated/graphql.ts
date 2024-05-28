/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Author = {
  __typename?: 'Author';
  _count: AuthorCount;
  bio?: Maybe<Scalars['String']['output']>;
  books?: Maybe<Array<BookAuthor>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AuthorCount = {
  __typename?: 'AuthorCount';
  books: Scalars['Int']['output'];
};

export type AuthorCreateNestedOneWithoutBooksInput = {
  connect?: InputMaybe<AuthorWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthorCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<AuthorCreateWithoutBooksInput>;
};

export type AuthorCreateOrConnectWithoutBooksInput = {
  create: AuthorCreateWithoutBooksInput;
  where: AuthorWhereUniqueInput;
};

export type AuthorCreateWithoutBooksInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type AuthorRelationFilter = {
  is?: InputMaybe<AuthorWhereInput>;
  isNot?: InputMaybe<AuthorWhereInput>;
};

export type AuthorWhereInput = {
  AND?: InputMaybe<Array<AuthorWhereInput>>;
  NOT?: InputMaybe<Array<AuthorWhereInput>>;
  OR?: InputMaybe<Array<AuthorWhereInput>>;
  bio?: InputMaybe<StringFilter>;
  books?: InputMaybe<BookAuthorListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type AuthorWhereUniqueInput = {
  AND?: InputMaybe<Array<AuthorWhereInput>>;
  NOT?: InputMaybe<Array<AuthorWhereInput>>;
  OR?: InputMaybe<Array<AuthorWhereInput>>;
  bio?: InputMaybe<StringFilter>;
  books?: InputMaybe<BookAuthorListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
};

export type Book = {
  __typename?: 'Book';
  CartItem?: Maybe<Array<CartItem>>;
  _count: BookCount;
  authors?: Maybe<Array<BookAuthor>>;
  category: Category;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Scalars['JSON']['output'];
  orderItems?: Maybe<Array<OrderItem>>;
  prices?: Maybe<Array<BookPrice>>;
  promotions?: Maybe<Array<Promotion>>;
  publishers?: Maybe<Array<BookPublisher>>;
  rating: Scalars['Float']['output'];
  ratings: Scalars['JSON']['output'];
  reviews?: Maybe<Array<Review>>;
  title: Scalars['String']['output'];
};

export type BookAuthor = {
  __typename?: 'BookAuthor';
  author: Author;
  authorId: Scalars['String']['output'];
  book: Book;
  bookId: Scalars['String']['output'];
};

export type BookAuthorBookIdAuthorIdCompoundUniqueInput = {
  authorId: Scalars['String']['input'];
  bookId: Scalars['String']['input'];
};

export type BookAuthorCreateManyBookInput = {
  authorId: Scalars['String']['input'];
};

export type BookAuthorCreateManyBookInputEnvelope = {
  data: Array<BookAuthorCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BookAuthorCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<BookAuthorWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookAuthorCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<BookAuthorCreateWithoutBookInput>>;
  createMany?: InputMaybe<BookAuthorCreateManyBookInputEnvelope>;
};

export type BookAuthorCreateOrConnectWithoutBookInput = {
  create: BookAuthorCreateWithoutBookInput;
  where: BookAuthorWhereUniqueInput;
};

export type BookAuthorCreateWithoutBookInput = {
  author: AuthorCreateNestedOneWithoutBooksInput;
};

export type BookAuthorListRelationFilter = {
  every?: InputMaybe<BookAuthorWhereInput>;
  none?: InputMaybe<BookAuthorWhereInput>;
  some?: InputMaybe<BookAuthorWhereInput>;
};

export type BookAuthorWhereInput = {
  AND?: InputMaybe<Array<BookAuthorWhereInput>>;
  NOT?: InputMaybe<Array<BookAuthorWhereInput>>;
  OR?: InputMaybe<Array<BookAuthorWhereInput>>;
  author?: InputMaybe<AuthorRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
};

export type BookAuthorWhereUniqueInput = {
  AND?: InputMaybe<Array<BookAuthorWhereInput>>;
  NOT?: InputMaybe<Array<BookAuthorWhereInput>>;
  OR?: InputMaybe<Array<BookAuthorWhereInput>>;
  author?: InputMaybe<AuthorRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  bookId_authorId?: InputMaybe<BookAuthorBookIdAuthorIdCompoundUniqueInput>;
};

export type BookCount = {
  __typename?: 'BookCount';
  CartItem: Scalars['Int']['output'];
  authors: Scalars['Int']['output'];
  orderItems: Scalars['Int']['output'];
  prices: Scalars['Int']['output'];
  promotions: Scalars['Int']['output'];
  publishers: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type BookCreateNestedOneWithoutCartItemInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutCartItemInput>;
  create?: InputMaybe<BookCreateWithoutCartItemInput>;
};

export type BookCreateNestedOneWithoutOrderItemsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutOrderItemsInput>;
  create?: InputMaybe<BookCreateWithoutOrderItemsInput>;
};

export type BookCreateNestedOneWithoutReviewsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<BookCreateWithoutReviewsInput>;
};

export type BookCreateOrConnectWithoutCartItemInput = {
  create: BookCreateWithoutCartItemInput;
  where: BookWhereUniqueInput;
};

export type BookCreateOrConnectWithoutOrderItemsInput = {
  create: BookCreateWithoutOrderItemsInput;
  where: BookWhereUniqueInput;
};

export type BookCreateOrConnectWithoutReviewsInput = {
  create: BookCreateWithoutReviewsInput;
  where: BookWhereUniqueInput;
};

export type BookCreateWithoutCartItemInput = {
  authors?: InputMaybe<BookAuthorCreateNestedManyWithoutBookInput>;
  category: CategoryCreateNestedOneWithoutBooksInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  images: Scalars['JSON']['input'];
  orderItems?: InputMaybe<OrderItemCreateNestedManyWithoutBookInput>;
  prices?: InputMaybe<BookPriceCreateNestedManyWithoutBookInput>;
  promotions?: InputMaybe<PromotionCreateNestedManyWithoutBookInput>;
  publishers?: InputMaybe<BookPublisherCreateNestedManyWithoutBookInput>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  ratings: Scalars['JSON']['input'];
  reviews?: InputMaybe<ReviewCreateNestedManyWithoutBookInput>;
  title: Scalars['String']['input'];
};

export type BookCreateWithoutOrderItemsInput = {
  CartItem?: InputMaybe<CartItemCreateNestedManyWithoutBookInput>;
  authors?: InputMaybe<BookAuthorCreateNestedManyWithoutBookInput>;
  category: CategoryCreateNestedOneWithoutBooksInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  images: Scalars['JSON']['input'];
  prices?: InputMaybe<BookPriceCreateNestedManyWithoutBookInput>;
  promotions?: InputMaybe<PromotionCreateNestedManyWithoutBookInput>;
  publishers?: InputMaybe<BookPublisherCreateNestedManyWithoutBookInput>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  ratings: Scalars['JSON']['input'];
  reviews?: InputMaybe<ReviewCreateNestedManyWithoutBookInput>;
  title: Scalars['String']['input'];
};

export type BookCreateWithoutReviewsInput = {
  CartItem?: InputMaybe<CartItemCreateNestedManyWithoutBookInput>;
  authors?: InputMaybe<BookAuthorCreateNestedManyWithoutBookInput>;
  category: CategoryCreateNestedOneWithoutBooksInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  images: Scalars['JSON']['input'];
  orderItems?: InputMaybe<OrderItemCreateNestedManyWithoutBookInput>;
  prices?: InputMaybe<BookPriceCreateNestedManyWithoutBookInput>;
  promotions?: InputMaybe<PromotionCreateNestedManyWithoutBookInput>;
  publishers?: InputMaybe<BookPublisherCreateNestedManyWithoutBookInput>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  ratings: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
};

export type BookListRelationFilter = {
  every?: InputMaybe<BookWhereInput>;
  none?: InputMaybe<BookWhereInput>;
  some?: InputMaybe<BookWhereInput>;
};

export type BookPrice = {
  __typename?: 'BookPrice';
  book: Book;
  bookId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discountPrice: Scalars['Float']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  originalPrice: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
};

export type BookPriceCreateManyBookInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  discountPrice: Scalars['Float']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  originalPrice: Scalars['Float']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type BookPriceCreateManyBookInputEnvelope = {
  data: Array<BookPriceCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BookPriceCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<BookPriceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookPriceCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<BookPriceCreateWithoutBookInput>>;
  createMany?: InputMaybe<BookPriceCreateManyBookInputEnvelope>;
};

export type BookPriceCreateOrConnectWithoutBookInput = {
  create: BookPriceCreateWithoutBookInput;
  where: BookPriceWhereUniqueInput;
};

export type BookPriceCreateWithoutBookInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  discountPrice: Scalars['Float']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  originalPrice: Scalars['Float']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type BookPriceListRelationFilter = {
  every?: InputMaybe<BookPriceWhereInput>;
  none?: InputMaybe<BookPriceWhereInput>;
  some?: InputMaybe<BookPriceWhereInput>;
};

export type BookPriceWhereInput = {
  AND?: InputMaybe<Array<BookPriceWhereInput>>;
  NOT?: InputMaybe<Array<BookPriceWhereInput>>;
  OR?: InputMaybe<Array<BookPriceWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  discountPrice?: InputMaybe<FloatFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  originalPrice?: InputMaybe<FloatFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
};

export type BookPriceWhereUniqueInput = {
  AND?: InputMaybe<Array<BookPriceWhereInput>>;
  NOT?: InputMaybe<Array<BookPriceWhereInput>>;
  OR?: InputMaybe<Array<BookPriceWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  discountPrice?: InputMaybe<FloatFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<FloatFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
};

export type BookPublisher = {
  __typename?: 'BookPublisher';
  book: Book;
  bookId: Scalars['String']['output'];
  publisher: Publisher;
  publisherId: Scalars['String']['output'];
};

export type BookPublisherBookIdPublisherIdCompoundUniqueInput = {
  bookId: Scalars['String']['input'];
  publisherId: Scalars['String']['input'];
};

export type BookPublisherCreateManyBookInput = {
  publisherId: Scalars['String']['input'];
};

export type BookPublisherCreateManyBookInputEnvelope = {
  data: Array<BookPublisherCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BookPublisherCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<BookPublisherWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookPublisherCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<BookPublisherCreateWithoutBookInput>>;
  createMany?: InputMaybe<BookPublisherCreateManyBookInputEnvelope>;
};

export type BookPublisherCreateOrConnectWithoutBookInput = {
  create: BookPublisherCreateWithoutBookInput;
  where: BookPublisherWhereUniqueInput;
};

export type BookPublisherCreateWithoutBookInput = {
  publisher: PublisherCreateNestedOneWithoutBooksInput;
};

export type BookPublisherListRelationFilter = {
  every?: InputMaybe<BookPublisherWhereInput>;
  none?: InputMaybe<BookPublisherWhereInput>;
  some?: InputMaybe<BookPublisherWhereInput>;
};

export type BookPublisherWhereInput = {
  AND?: InputMaybe<Array<BookPublisherWhereInput>>;
  NOT?: InputMaybe<Array<BookPublisherWhereInput>>;
  OR?: InputMaybe<Array<BookPublisherWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  publisher?: InputMaybe<PublisherRelationFilter>;
  publisherId?: InputMaybe<StringFilter>;
};

export type BookPublisherWhereUniqueInput = {
  AND?: InputMaybe<Array<BookPublisherWhereInput>>;
  NOT?: InputMaybe<Array<BookPublisherWhereInput>>;
  OR?: InputMaybe<Array<BookPublisherWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  bookId_publisherId?: InputMaybe<BookPublisherBookIdPublisherIdCompoundUniqueInput>;
  publisher?: InputMaybe<PublisherRelationFilter>;
  publisherId?: InputMaybe<StringFilter>;
};

export type BookRelationFilter = {
  is?: InputMaybe<BookWhereInput>;
  isNot?: InputMaybe<BookWhereInput>;
};

export type BookWhereInput = {
  AND?: InputMaybe<Array<BookWhereInput>>;
  CartItem?: InputMaybe<CartItemListRelationFilter>;
  NOT?: InputMaybe<Array<BookWhereInput>>;
  OR?: InputMaybe<Array<BookWhereInput>>;
  authors?: InputMaybe<BookAuthorListRelationFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<JsonFilter>;
  orderItems?: InputMaybe<OrderItemListRelationFilter>;
  prices?: InputMaybe<BookPriceListRelationFilter>;
  promotions?: InputMaybe<PromotionListRelationFilter>;
  publishers?: InputMaybe<BookPublisherListRelationFilter>;
  rating?: InputMaybe<FloatFilter>;
  ratings?: InputMaybe<JsonFilter>;
  reviews?: InputMaybe<ReviewListRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BookWhereUniqueInput = {
  AND?: InputMaybe<Array<BookWhereInput>>;
  CartItem?: InputMaybe<CartItemListRelationFilter>;
  NOT?: InputMaybe<Array<BookWhereInput>>;
  OR?: InputMaybe<Array<BookWhereInput>>;
  authors?: InputMaybe<BookAuthorListRelationFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<JsonFilter>;
  orderItems?: InputMaybe<OrderItemListRelationFilter>;
  prices?: InputMaybe<BookPriceListRelationFilter>;
  promotions?: InputMaybe<PromotionListRelationFilter>;
  publishers?: InputMaybe<BookPublisherListRelationFilter>;
  rating?: InputMaybe<FloatFilter>;
  ratings?: InputMaybe<JsonFilter>;
  reviews?: InputMaybe<ReviewListRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BoolFilter>;
};

export type Cart = {
  __typename?: 'Cart';
  _count: CartCount;
  guestId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<CartItem>>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CartCount = {
  __typename?: 'CartCount';
  items: Scalars['Int']['output'];
};

export type CartCreateManyUserInput = {
  guestId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type CartCreateManyUserInputEnvelope = {
  data: Array<CartCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CartCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CartWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CartCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CartCreateWithoutUserInput>>;
  createMany?: InputMaybe<CartCreateManyUserInputEnvelope>;
};

export type CartCreateNestedOneWithoutItemsInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CartCreateOrConnectWithoutItemsInput>;
  create?: InputMaybe<CartCreateWithoutItemsInput>;
};

export type CartCreateOrConnectWithoutItemsInput = {
  create: CartCreateWithoutItemsInput;
  where: CartWhereUniqueInput;
};

export type CartCreateOrConnectWithoutUserInput = {
  create: CartCreateWithoutUserInput;
  where: CartWhereUniqueInput;
};

export type CartCreateWithoutItemsInput = {
  guestId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserCreateNestedOneWithoutCartInput>;
};

export type CartCreateWithoutUserInput = {
  guestId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<CartItemCreateNestedManyWithoutCartInput>;
};

export type CartItem = {
  __typename?: 'CartItem';
  book: Book;
  bookId: Scalars['String']['output'];
  cart: Cart;
  cartId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  priceId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type CartItemCreateInput = {
  book: BookCreateNestedOneWithoutCartItemInput;
  cart: CartCreateNestedOneWithoutItemsInput;
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItemCreateManyBookInput = {
  cartId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItemCreateManyBookInputEnvelope = {
  data: Array<CartItemCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CartItemCreateManyCartInput = {
  bookId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItemCreateManyCartInputEnvelope = {
  data: Array<CartItemCreateManyCartInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CartItemCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CartItemCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<CartItemCreateWithoutBookInput>>;
  createMany?: InputMaybe<CartItemCreateManyBookInputEnvelope>;
};

export type CartItemCreateNestedManyWithoutCartInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CartItemCreateOrConnectWithoutCartInput>>;
  create?: InputMaybe<Array<CartItemCreateWithoutCartInput>>;
  createMany?: InputMaybe<CartItemCreateManyCartInputEnvelope>;
};

export type CartItemCreateOrConnectWithoutBookInput = {
  create: CartItemCreateWithoutBookInput;
  where: CartItemWhereUniqueInput;
};

export type CartItemCreateOrConnectWithoutCartInput = {
  create: CartItemCreateWithoutCartInput;
  where: CartItemWhereUniqueInput;
};

export type CartItemCreateWithoutBookInput = {
  cart: CartCreateNestedOneWithoutItemsInput;
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItemCreateWithoutCartInput = {
  book: BookCreateNestedOneWithoutCartItemInput;
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItemListRelationFilter = {
  every?: InputMaybe<CartItemWhereInput>;
  none?: InputMaybe<CartItemWhereInput>;
  some?: InputMaybe<CartItemWhereInput>;
};

export type CartItemWhereInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  cart?: InputMaybe<CartRelationFilter>;
  cartId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  priceId?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
};

export type CartItemWhereUniqueInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  cart?: InputMaybe<CartRelationFilter>;
  cartId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  priceId?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
};

export type CartListRelationFilter = {
  every?: InputMaybe<CartWhereInput>;
  none?: InputMaybe<CartWhereInput>;
  some?: InputMaybe<CartWhereInput>;
};

export type CartRelationFilter = {
  is?: InputMaybe<CartWhereInput>;
  isNot?: InputMaybe<CartWhereInput>;
};

export type CartResponseCustom = {
  __typename?: 'CartResponseCustom';
  _count: CartCount;
  guestId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<CartItem>>;
  total: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CartWhereInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  guestId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  items?: InputMaybe<CartItemListRelationFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type CartWhereUniqueInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  guestId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<CartItemListRelationFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Category = {
  __typename?: 'Category';
  _count: CategoryCount;
  books?: Maybe<Array<Book>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  books: Scalars['Int']['output'];
};

export type CategoryCreateNestedOneWithoutBooksInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<CategoryCreateWithoutBooksInput>;
};

export type CategoryCreateOrConnectWithoutBooksInput = {
  create: CategoryCreateWithoutBooksInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateWithoutBooksInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CategoryRelationFilter = {
  is?: InputMaybe<CategoryWhereInput>;
  isNot?: InputMaybe<CategoryWhereInput>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  books?: InputMaybe<BookListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type CategoryWhereUniqueInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  books?: InputMaybe<BookListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateOrderInput = {
  items?: InputMaybe<OrderItemCreateNestedManyWithoutOrderInput>;
};

export type CreateReviewInput = {
  book: BookCreateNestedOneWithoutReviewsInput;
  content?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: Scalars['Boolean']['output'];
  createCategory: Scalars['Boolean']['output'];
  createOrder: Order;
  createReview: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  login: ResUserDto;
  removeItemFromCart: Scalars['Boolean']['output'];
  updateCategory: Scalars['Boolean']['output'];
  updateQuantityOfItem: Scalars['Boolean']['output'];
};


export type MutationAddItemToCartArgs = {
  items: CartItemCreateInput;
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
  guestId: Scalars['String']['input'];
};


export type MutationCreateReviewArgs = {
  data: CreateReviewInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  userLoginDto: LoginInput;
};


export type MutationRemoveItemFromCartArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  data: CreateCategoryInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateQuantityOfItemArgs = {
  id: Scalars['String']['input'];
  quantity: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  _count: OrderCount;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OrderItem>>;
  orderDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type OrderCount = {
  __typename?: 'OrderCount';
  items: Scalars['Int']['output'];
};

export type OrderCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  orderDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type OrderCreateManyUserInputEnvelope = {
  data: Array<OrderCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<OrderCreateWithoutUserInput>>;
  createMany?: InputMaybe<OrderCreateManyUserInputEnvelope>;
};

export type OrderCreateNestedOneWithoutItemsInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrderCreateOrConnectWithoutItemsInput>;
  create?: InputMaybe<OrderCreateWithoutItemsInput>;
};

export type OrderCreateOrConnectWithoutItemsInput = {
  create: OrderCreateWithoutItemsInput;
  where: OrderWhereUniqueInput;
};

export type OrderCreateOrConnectWithoutUserInput = {
  create: OrderCreateWithoutUserInput;
  where: OrderWhereUniqueInput;
};

export type OrderCreateWithoutItemsInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  orderDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user: UserCreateNestedOneWithoutOrdersInput;
};

export type OrderCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<OrderItemCreateNestedManyWithoutOrderInput>;
  orderDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  book: Book;
  bookId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order: Order;
  orderId: Scalars['String']['output'];
  priceId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type OrderItemCreateManyBookInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderItemCreateManyBookInputEnvelope = {
  data: Array<OrderItemCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderItemCreateManyOrderInput = {
  bookId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderItemCreateManyOrderInputEnvelope = {
  data: Array<OrderItemCreateManyOrderInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderItemCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderItemCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<OrderItemCreateWithoutBookInput>>;
  createMany?: InputMaybe<OrderItemCreateManyBookInputEnvelope>;
};

export type OrderItemCreateNestedManyWithoutOrderInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderItemCreateOrConnectWithoutOrderInput>>;
  create?: InputMaybe<Array<OrderItemCreateWithoutOrderInput>>;
  createMany?: InputMaybe<OrderItemCreateManyOrderInputEnvelope>;
};

export type OrderItemCreateOrConnectWithoutBookInput = {
  create: OrderItemCreateWithoutBookInput;
  where: OrderItemWhereUniqueInput;
};

export type OrderItemCreateOrConnectWithoutOrderInput = {
  create: OrderItemCreateWithoutOrderInput;
  where: OrderItemWhereUniqueInput;
};

export type OrderItemCreateWithoutBookInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  order: OrderCreateNestedOneWithoutItemsInput;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderItemCreateWithoutOrderInput = {
  book: BookCreateNestedOneWithoutOrderItemsInput;
  id?: InputMaybe<Scalars['String']['input']>;
  priceId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderItemListRelationFilter = {
  every?: InputMaybe<OrderItemWhereInput>;
  none?: InputMaybe<OrderItemWhereInput>;
  some?: InputMaybe<OrderItemWhereInput>;
};

export type OrderItemWhereInput = {
  AND?: InputMaybe<Array<OrderItemWhereInput>>;
  NOT?: InputMaybe<Array<OrderItemWhereInput>>;
  OR?: InputMaybe<Array<OrderItemWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  orderId?: InputMaybe<StringFilter>;
  priceId?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
};

export type OrderItemWhereUniqueInput = {
  AND?: InputMaybe<Array<OrderItemWhereInput>>;
  NOT?: InputMaybe<Array<OrderItemWhereInput>>;
  OR?: InputMaybe<Array<OrderItemWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelationFilter>;
  orderId?: InputMaybe<StringFilter>;
  priceId?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
};

export type OrderListRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderRelationFilter = {
  is?: InputMaybe<OrderWhereInput>;
  isNot?: InputMaybe<OrderWhereInput>;
};

export type OrderResponseCustom = {
  __typename?: 'OrderResponseCustom';
  _count: OrderCount;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OrderItem>>;
  orderDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  total: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  id?: InputMaybe<StringFilter>;
  items?: InputMaybe<OrderItemListRelationFilter>;
  orderDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type OrderWhereUniqueInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<OrderItemListRelationFilter>;
  orderDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Float']['output'];
  nextPage: Scalars['String']['output'];
  pages: Array<Scalars['Float']['output']>;
  prevPage: Scalars['String']['output'];
};

export type Promotion = {
  __typename?: 'Promotion';
  book: Book;
  bookId: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  promotionType: Scalars['String']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type PromotionCreateManyBookInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  promotionType: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PromotionCreateManyBookInputEnvelope = {
  data: Array<PromotionCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PromotionCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<PromotionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PromotionCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<PromotionCreateWithoutBookInput>>;
  createMany?: InputMaybe<PromotionCreateManyBookInputEnvelope>;
};

export type PromotionCreateOrConnectWithoutBookInput = {
  create: PromotionCreateWithoutBookInput;
  where: PromotionWhereUniqueInput;
};

export type PromotionCreateWithoutBookInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  promotionType: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PromotionListRelationFilter = {
  every?: InputMaybe<PromotionWhereInput>;
  none?: InputMaybe<PromotionWhereInput>;
  some?: InputMaybe<PromotionWhereInput>;
};

export type PromotionWhereInput = {
  AND?: InputMaybe<Array<PromotionWhereInput>>;
  NOT?: InputMaybe<Array<PromotionWhereInput>>;
  OR?: InputMaybe<Array<PromotionWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  promotionType?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
};

export type PromotionWhereUniqueInput = {
  AND?: InputMaybe<Array<PromotionWhereInput>>;
  NOT?: InputMaybe<Array<PromotionWhereInput>>;
  OR?: InputMaybe<Array<PromotionWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  promotionType?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
};

export type Publisher = {
  __typename?: 'Publisher';
  _count: PublisherCount;
  address?: Maybe<Scalars['String']['output']>;
  books?: Maybe<Array<BookPublisher>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PublisherCount = {
  __typename?: 'PublisherCount';
  books: Scalars['Int']['output'];
};

export type PublisherCreateNestedOneWithoutBooksInput = {
  connect?: InputMaybe<PublisherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PublisherCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<PublisherCreateWithoutBooksInput>;
};

export type PublisherCreateOrConnectWithoutBooksInput = {
  create: PublisherCreateWithoutBooksInput;
  where: PublisherWhereUniqueInput;
};

export type PublisherCreateWithoutBooksInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type PublisherRelationFilter = {
  is?: InputMaybe<PublisherWhereInput>;
  isNot?: InputMaybe<PublisherWhereInput>;
};

export type PublisherWhereInput = {
  AND?: InputMaybe<Array<PublisherWhereInput>>;
  NOT?: InputMaybe<Array<PublisherWhereInput>>;
  OR?: InputMaybe<Array<PublisherWhereInput>>;
  address?: InputMaybe<StringFilter>;
  books?: InputMaybe<BookPublisherListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type PublisherWhereUniqueInput = {
  AND?: InputMaybe<Array<PublisherWhereInput>>;
  NOT?: InputMaybe<Array<PublisherWhereInput>>;
  OR?: InputMaybe<Array<PublisherWhereInput>>;
  address?: InputMaybe<StringFilter>;
  books?: InputMaybe<BookPublisherListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
};

export type Query = {
  __typename?: 'Query';
  authors: Array<Author>;
  book: Book;
  books: Array<Book>;
  booksByAuthor: Array<Book>;
  booksByCategory: Array<Book>;
  booksByPrice: Array<Book>;
  booksByRating: Array<Book>;
  categories: Array<Category>;
  getCart: CartResponseCustom;
  healhCheck: Scalars['String']['output'];
  orders: Array<OrderResponseCustom>;
  popularBooks: Array<Book>;
  promotions: Array<Promotion>;
  promotionsOnSale: Array<Promotion>;
  publishers: Array<Publisher>;
  recommendBooks: Array<Book>;
  reviews: Array<Review>;
  reviewsByBook: ReviewResponseCustom;
  test: Scalars['String']['output'];
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryBooksByAuthorArgs = {
  author_id: Scalars['String']['input'];
};


export type QueryBooksByCategoryArgs = {
  category_id: Scalars['String']['input'];
};


export type QueryBooksByPriceArgs = {
  type: Scalars['String']['input'];
};


export type QueryBooksByRatingArgs = {
  star: Scalars['String']['input'];
};


export type QueryGetCartArgs = {
  id: Scalars['String']['input'];
};


export type QueryReviewsByBookArgs = {
  bookId: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['String']['input']>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type ResUserDto = {
  __typename?: 'ResUserDto';
  token: Scalars['String']['output'];
  user: User;
};

export type Review = {
  __typename?: 'Review';
  book: Book;
  bookId: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ReviewCreateManyBookInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ReviewCreateManyBookInputEnvelope = {
  data: Array<ReviewCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReviewCreateManyUserInput = {
  bookId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type ReviewCreateManyUserInputEnvelope = {
  data: Array<ReviewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReviewCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReviewCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<ReviewCreateWithoutBookInput>>;
  createMany?: InputMaybe<ReviewCreateManyBookInputEnvelope>;
};

export type ReviewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReviewCreateManyUserInputEnvelope>;
};

export type ReviewCreateOrConnectWithoutBookInput = {
  create: ReviewCreateWithoutBookInput;
  where: ReviewWhereUniqueInput;
};

export type ReviewCreateOrConnectWithoutUserInput = {
  create: ReviewCreateWithoutUserInput;
  where: ReviewWhereUniqueInput;
};

export type ReviewCreateWithoutBookInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  user: UserCreateNestedOneWithoutReviewsInput;
};

export type ReviewCreateWithoutUserInput = {
  book: BookCreateNestedOneWithoutReviewsInput;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type ReviewListRelationFilter = {
  every?: InputMaybe<ReviewWhereInput>;
  none?: InputMaybe<ReviewWhereInput>;
  some?: InputMaybe<ReviewWhereInput>;
};

export type ReviewResponseCustom = {
  __typename?: 'ReviewResponseCustom';
  reviews: Array<Review>;
  totalPage: Scalars['Float']['output'];
};

export type ReviewWhereInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  rating?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ReviewWhereUniqueInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  Cart?: Maybe<Array<Cart>>;
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  orders?: Maybe<Array<Order>>;
  password: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  Cart: Scalars['Int']['output'];
  orders: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type UserCreateNestedOneWithoutCartInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCartInput>;
  create?: InputMaybe<UserCreateWithoutCartInput>;
};

export type UserCreateNestedOneWithoutOrdersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOrdersInput>;
  create?: InputMaybe<UserCreateWithoutOrdersInput>;
};

export type UserCreateNestedOneWithoutReviewsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<UserCreateWithoutReviewsInput>;
};

export type UserCreateOrConnectWithoutCartInput = {
  create: UserCreateWithoutCartInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutOrdersInput = {
  create: UserCreateWithoutOrdersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutReviewsInput = {
  create: UserCreateWithoutReviewsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutCartInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<OrderCreateNestedManyWithoutUserInput>;
  password: Scalars['String']['input'];
  reviews?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutOrdersInput = {
  Cart?: InputMaybe<CartCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
  reviews?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutReviewsInput = {
  Cart?: InputMaybe<CartCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<OrderCreateNestedManyWithoutUserInput>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  Cart?: InputMaybe<CartListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isAdmin?: InputMaybe<BoolFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  reviews?: InputMaybe<ReviewListRelationFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  Cart?: InputMaybe<CartListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<BoolFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  reviews?: InputMaybe<ReviewListRelationFilter>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AddItemToCartMutationVariables = Exact<{
  items: CartItemCreateInput;
  userId: Scalars['String']['input'];
  type: Scalars['String']['input'];
}>;


export type AddItemToCartMutation = { __typename?: 'Mutation', addItemToCart: boolean };

export type UpdateQuantityOfItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
  quantity: Scalars['String']['input'];
}>;


export type UpdateQuantityOfItemMutation = { __typename?: 'Mutation', updateQuantityOfItem: boolean };

export type RemoveItemFromCartMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveItemFromCartMutation = { __typename?: 'Mutation', removeItemFromCart: boolean };

export type LoginMutationVariables = Exact<{
  userLoginDto: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ResUserDto', token: string, user: { __typename?: 'User', id: string, username: string, email: string, isAdmin: boolean } } };

export type AuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', id: string, name: string }> };

export type PromotionsOnSaleQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionsOnSaleQuery = { __typename?: 'Query', promotionsOnSale: Array<{ __typename?: 'Promotion', id: string, bookId: string, promotionType: string, startDate?: any | null, endDate?: any | null, book: { __typename?: 'Book', id: string, title: string, description?: string | null, categoryId: string, rating: number, ratings: any, images: any, createdAt: any, prices?: Array<{ __typename?: 'BookPrice', id: string, bookId: string, originalPrice: number, discountPrice: number, startDate: any, endDate?: any | null, createdAt: any }> | null } }> };

export type RecommendBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendBooksQuery = { __typename?: 'Query', recommendBooks: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, categoryId: string, rating: number, ratings: any, images: any, createdAt: any, prices?: Array<{ __typename?: 'BookPrice', id: string, bookId: string, originalPrice: number, discountPrice: number, startDate: any, endDate?: any | null, createdAt: any }> | null }> };

export type PopularBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularBooksQuery = { __typename?: 'Query', popularBooks: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, categoryId: string, rating: number, ratings: any, images: any, createdAt: any, prices?: Array<{ __typename?: 'BookPrice', id: string, bookId: string, originalPrice: number, discountPrice: number, startDate: any, endDate?: any | null, createdAt: any }> | null }> };

export type GetBookQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBookQuery = { __typename?: 'Query', book: { __typename?: 'Book', id: string, title: string, description?: string | null, rating: number, ratings: any, images: any, prices?: Array<{ __typename?: 'BookPrice', id: string, originalPrice: number, discountPrice: number }> | null, category: { __typename?: 'Category', name: string }, authors?: Array<{ __typename?: 'BookAuthor', author: { __typename?: 'Author', name: string } }> | null } };

export type ReviewsByBookQueryVariables = Exact<{
  id: Scalars['String']['input'];
  skip: Scalars['String']['input'];
  take: Scalars['String']['input'];
}>;


export type ReviewsByBookQuery = { __typename?: 'Query', reviewsByBook: { __typename?: 'ReviewResponseCustom', totalPage: number, reviews: Array<{ __typename?: 'Review', id: string, rating: number, title: string, content?: string | null, createdAt: any, user: { __typename?: 'User', username: string } }> } };

export type GetCartQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCartQuery = { __typename?: 'Query', getCart: { __typename?: 'CartResponseCustom', id: string, userId?: string | null, guestId?: string | null, total: string, items?: Array<{ __typename?: 'CartItem', id: string, quantity: number, priceId: string, book: { __typename?: 'Book', id: string, title: string, description?: string | null, rating: number, images: any, prices?: Array<{ __typename?: 'BookPrice', originalPrice: number, discountPrice: number, startDate: any, endDate?: any | null, createdAt: any }> | null, authors?: Array<{ __typename?: 'BookAuthor', author: { __typename?: 'Author', name: string } }> | null } }> | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };


export const AddItemToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItemToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartItemCreateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItemToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}]}]}}]} as unknown as DocumentNode<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const UpdateQuantityOfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuantityOfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuantityOfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}]}]}}]} as unknown as DocumentNode<UpdateQuantityOfItemMutation, UpdateQuantityOfItemMutationVariables>;
export const RemoveItemFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveItemFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeItemFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userLoginDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userLoginDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userLoginDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const AuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AuthorsQuery, AuthorsQueryVariables>;
export const PromotionsOnSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PromotionsOnSale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promotionsOnSale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"promotionType"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PromotionsOnSaleQuery, PromotionsOnSaleQueryVariables>;
export const RecommendBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecommendBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<RecommendBooksQuery, RecommendBooksQueryVariables>;
export const PopularBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PopularBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popularBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<PopularBooksQuery, PopularBooksQueryVariables>;
export const GetBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"book"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBookQuery, GetBookQueryVariables>;
export const ReviewsByBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"reviewsByBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewsByBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPage"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReviewsByBookQuery, ReviewsByBookQueryVariables>;
export const GetCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"guestId"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"priceId"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;