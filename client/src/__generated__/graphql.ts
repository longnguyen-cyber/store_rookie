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
  authors: Scalars['Int']['output'];
  orderItems: Scalars['Int']['output'];
  prices: Scalars['Int']['output'];
  promotions: Scalars['Int']['output'];
  publishers: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type BookCreateNestedOneWithoutReviewsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<BookCreateWithoutReviewsInput>;
};

export type BookCreateOrConnectWithoutReviewsInput = {
  create: BookCreateWithoutReviewsInput;
  where: BookWhereUniqueInput;
};

export type BookCreateWithoutReviewsInput = {
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

export type CreateReviewInput = {
  book: BookCreateNestedOneWithoutReviewsInput;
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
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
  createCategory: Scalars['Boolean']['output'];
  createReview: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  login: ResUserDto;
  updateCategory: Scalars['Boolean']['output'];
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
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


export type MutationUpdateCategoryArgs = {
  data: CreateCategoryInput;
  id: Scalars['String']['input'];
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

export type OrderCreateNestedOneWithoutItemsInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrderCreateOrConnectWithoutItemsInput>;
  create?: InputMaybe<OrderCreateWithoutItemsInput>;
};

export type OrderCreateOrConnectWithoutItemsInput = {
  create: OrderCreateWithoutItemsInput;
  where: OrderWhereUniqueInput;
};

export type OrderCreateWithoutItemsInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  orderDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user: UserCreateNestedOneWithoutOrdersInput;
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

export type OrderItemCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderItemCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<OrderItemCreateWithoutBookInput>>;
  createMany?: InputMaybe<OrderItemCreateManyBookInputEnvelope>;
};

export type OrderItemCreateOrConnectWithoutBookInput = {
  create: OrderItemCreateWithoutBookInput;
  where: OrderItemWhereUniqueInput;
};

export type OrderItemCreateWithoutBookInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  order: OrderCreateNestedOneWithoutItemsInput;
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

export type PaginatedCategoryResponse = {
  __typename?: 'PaginatedCategoryResponse';
  data: Array<Category>;
  pagination: Pagination;
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
  books: Array<Book>;
  booksByAuthor: Array<Book>;
  booksByCategory: Array<Book>;
  booksByPrice: Array<Book>;
  booksByRating: Array<Book>;
  categories: PaginatedCategoryResponse;
  category: PaginatedCategoryResponse;
  healhCheck: Scalars['String']['output'];
  orders: Array<Order>;
  popularBooks: Array<Book>;
  promotions: Array<Promotion>;
  promotionsOnSale: Array<Promotion>;
  publishers: Array<Publisher>;
  recommendBooks: Array<Book>;
  reviews: Array<Review>;
  reviewsByBookId: Array<Review>;
  test: Scalars['String']['output'];
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


export type QueryCategoriesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryReviewsByBookIdArgs = {
  bookId: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type ResUserDto = {
  __typename?: 'ResUserDto';
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  orders?: Maybe<Array<Order>>;
  password: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Review = {
  __typename?: 'Review';
  book: Book;
  bookId: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ReviewCreateManyUserInput = {
  bookId: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
};

export type ReviewCreateManyUserInputEnvelope = {
  data: Array<ReviewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReviewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReviewCreateManyUserInputEnvelope>;
};

export type ReviewCreateOrConnectWithoutUserInput = {
  create: ReviewCreateWithoutUserInput;
  where: ReviewWhereUniqueInput;
};

export type ReviewCreateWithoutUserInput = {
  book: BookCreateNestedOneWithoutReviewsInput;
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
};

export type ReviewListRelationFilter = {
  every?: InputMaybe<ReviewWhereInput>;
  none?: InputMaybe<ReviewWhereInput>;
  some?: InputMaybe<ReviewWhereInput>;
};

export type ReviewWhereInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  rating?: InputMaybe<IntFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ReviewWhereUniqueInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<IntFilter>;
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
  orders: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type UserCreateNestedOneWithoutOrdersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOrdersInput>;
  create?: InputMaybe<UserCreateWithoutOrdersInput>;
};

export type UserCreateOrConnectWithoutOrdersInput = {
  create: UserCreateWithoutOrdersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutOrdersInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
  reviews?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  username: Scalars['String']['input'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
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

export type HealhCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealhCheckQuery = { __typename?: 'Query', healhCheck: string };


export const HealhCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HealhCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"healhCheck"}}]}}]} as unknown as DocumentNode<HealhCheckQuery, HealhCheckQueryVariables>;