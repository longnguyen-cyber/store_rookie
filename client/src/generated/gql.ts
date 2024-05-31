/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddItemToCart($items: CartItemCreateInput!, $userId: String!, $type: String!) {\n    addItemToCart(items: $items, userId: $userId, type: $type)\n  }\n": types.AddItemToCartDocument,
    "\n  mutation UpdateQuantityOfItem($id: String!, $quantity: String!) {\n    updateQuantityOfItem(id: $id, quantity: $quantity)\n  }\n": types.UpdateQuantityOfItemDocument,
    "\n  mutation RemoveItemFromCart($id: String!) {\n    removeItemFromCart(id: $id)\n  }\n": types.RemoveItemFromCartDocument,
    "\n  mutation CreateOrder($data: CreateOrderInput!, $guestId: String!) {\n    createOrder(data: $data, guestId: $guestId) {\n      id\n      userId\n      orderDate\n      status\n      payment\n      address\n      shipping\n    }\n  }\n\n": types.CreateOrderDocument,
    "\n  mutation CreateReview($data: CreateReviewInput!) {\n    createReview(data: $data)\n  }\n": types.CreateReviewDocument,
    "\n  mutation Login( $userLoginDto: LoginInput!) {\n    login(userLoginDto: $userLoginDto) {\n      user {\n        id\n        username\n        email\n        isAdmin\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query Authors {\n    authors {\n        id\n        name\n    }\n  }\n": types.AuthorsDocument,
    "\n  query Books($skip:String) {\n    books(skip: $skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n": types.BooksDocument,
    "\n  query PromotionsOnSale {\n    promotionsOnSale {\n        id\n        bookId\n        promotionType\n        startDate\n        endDate\n        book {\n            id\n            title\n            description\n            categoryId\n            rating\n            ratings\n            images\n            createdAt\n            prices {\n                id\n                bookId\n                originalPrice\n                discountPrice\n                startDate\n                endDate\n                createdAt\n            }\n        }\n    }\n  }\n": types.PromotionsOnSaleDocument,
    "\n  query RecommendBooks {\n    recommendBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n": types.RecommendBooksDocument,
    "\n  query PopularBooks {\n    popularBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n": types.PopularBooksDocument,
    "\n  query GetBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      description\n      rating\n      ratings\n      images\n      prices {\n        id\n        originalPrice\n        discountPrice\n      }\n      category {\n        name\n      }\n      authors {\n        author {\n            name\n        }\n      }\n    }\n  }\n": types.GetBookDocument,
    "\n  query reviewsByBook($id: String!, $skip: String!, $take: String!) {\n    reviewsByBook(bookId: $id, skip: $skip, take: $take) {\n      totalPage\n        reviews {\n          id\n          rating\n          title\n          content\n          createdAt\n          updatedAt\n          user {\n            id\n            username\n          }\n      }\n    }\n  }\n": types.ReviewsByBookDocument,
    "\n  query BooksByRating($star: String!, $type: String!, $skip:String) {\n    booksByRating(star: $star, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n": types.BooksByRatingDocument,
    "\n  query BooksByCategory($category_id: String!, $type: String!, $skip:String) {\n    booksByCategory(category_id: $category_id, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n": types.BooksByCategoryDocument,
    "\n  query BooksByAuthor($author_id: String!, $type: String!, $skip:String) {\n    booksByAuthor(author_id: $author_id, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n": types.BooksByAuthorDocument,
    "\n  query GetCart($id: String!) {\n    getCart(id: $id) {\n\t\t\tid\n\t\t\tuserId\n\t\t\tguestId\n\t\t\ttotal\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tpriceId\n\t\t\t\tbook {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\trating\n\t\t\t\t\timages\n\t\t\t\t\tprices {\n\t\t\t\t\t\tid\n\t\t\t\t\t\toriginalPrice\n\t\t\t\t\t\tdiscountPrice\n\t\t\t\t\t\tstartDate\n\t\t\t\t\t\tendDate\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tauthor {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n    }\n  }\n": types.GetCartDocument,
    "\n  query Categories {\n    categories {\n        id\n        name\n    }\n  }\n": types.CategoriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddItemToCart($items: CartItemCreateInput!, $userId: String!, $type: String!) {\n    addItemToCart(items: $items, userId: $userId, type: $type)\n  }\n"): (typeof documents)["\n  mutation AddItemToCart($items: CartItemCreateInput!, $userId: String!, $type: String!) {\n    addItemToCart(items: $items, userId: $userId, type: $type)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateQuantityOfItem($id: String!, $quantity: String!) {\n    updateQuantityOfItem(id: $id, quantity: $quantity)\n  }\n"): (typeof documents)["\n  mutation UpdateQuantityOfItem($id: String!, $quantity: String!) {\n    updateQuantityOfItem(id: $id, quantity: $quantity)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveItemFromCart($id: String!) {\n    removeItemFromCart(id: $id)\n  }\n"): (typeof documents)["\n  mutation RemoveItemFromCart($id: String!) {\n    removeItemFromCart(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateOrder($data: CreateOrderInput!, $guestId: String!) {\n    createOrder(data: $data, guestId: $guestId) {\n      id\n      userId\n      orderDate\n      status\n      payment\n      address\n      shipping\n    }\n  }\n\n"): (typeof documents)["\n  mutation CreateOrder($data: CreateOrderInput!, $guestId: String!) {\n    createOrder(data: $data, guestId: $guestId) {\n      id\n      userId\n      orderDate\n      status\n      payment\n      address\n      shipping\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateReview($data: CreateReviewInput!) {\n    createReview(data: $data)\n  }\n"): (typeof documents)["\n  mutation CreateReview($data: CreateReviewInput!) {\n    createReview(data: $data)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login( $userLoginDto: LoginInput!) {\n    login(userLoginDto: $userLoginDto) {\n      user {\n        id\n        username\n        email\n        isAdmin\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login( $userLoginDto: LoginInput!) {\n    login(userLoginDto: $userLoginDto) {\n      user {\n        id\n        username\n        email\n        isAdmin\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Authors {\n    authors {\n        id\n        name\n    }\n  }\n"): (typeof documents)["\n  query Authors {\n    authors {\n        id\n        name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Books($skip:String) {\n    books(skip: $skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Books($skip:String) {\n    books(skip: $skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PromotionsOnSale {\n    promotionsOnSale {\n        id\n        bookId\n        promotionType\n        startDate\n        endDate\n        book {\n            id\n            title\n            description\n            categoryId\n            rating\n            ratings\n            images\n            createdAt\n            prices {\n                id\n                bookId\n                originalPrice\n                discountPrice\n                startDate\n                endDate\n                createdAt\n            }\n        }\n    }\n  }\n"): (typeof documents)["\n  query PromotionsOnSale {\n    promotionsOnSale {\n        id\n        bookId\n        promotionType\n        startDate\n        endDate\n        book {\n            id\n            title\n            description\n            categoryId\n            rating\n            ratings\n            images\n            createdAt\n            prices {\n                id\n                bookId\n                originalPrice\n                discountPrice\n                startDate\n                endDate\n                createdAt\n            }\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RecommendBooks {\n    recommendBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n"): (typeof documents)["\n  query RecommendBooks {\n    recommendBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PopularBooks {\n    popularBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n"): (typeof documents)["\n  query PopularBooks {\n    popularBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      description\n      rating\n      ratings\n      images\n      prices {\n        id\n        originalPrice\n        discountPrice\n      }\n      category {\n        name\n      }\n      authors {\n        author {\n            name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      description\n      rating\n      ratings\n      images\n      prices {\n        id\n        originalPrice\n        discountPrice\n      }\n      category {\n        name\n      }\n      authors {\n        author {\n            name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query reviewsByBook($id: String!, $skip: String!, $take: String!) {\n    reviewsByBook(bookId: $id, skip: $skip, take: $take) {\n      totalPage\n        reviews {\n          id\n          rating\n          title\n          content\n          createdAt\n          updatedAt\n          user {\n            id\n            username\n          }\n      }\n    }\n  }\n"): (typeof documents)["\n  query reviewsByBook($id: String!, $skip: String!, $take: String!) {\n    reviewsByBook(bookId: $id, skip: $skip, take: $take) {\n      totalPage\n        reviews {\n          id\n          rating\n          title\n          content\n          createdAt\n          updatedAt\n          user {\n            id\n            username\n          }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BooksByRating($star: String!, $type: String!, $skip:String) {\n    booksByRating(star: $star, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query BooksByRating($star: String!, $type: String!, $skip:String) {\n    booksByRating(star: $star, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BooksByCategory($category_id: String!, $type: String!, $skip:String) {\n    booksByCategory(category_id: $category_id, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query BooksByCategory($category_id: String!, $type: String!, $skip:String) {\n    booksByCategory(category_id: $category_id, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BooksByAuthor($author_id: String!, $type: String!, $skip:String) {\n    booksByAuthor(author_id: $author_id, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query BooksByAuthor($author_id: String!, $type: String!, $skip:String) {\n    booksByAuthor(author_id: $author_id, type: $type, skip:$skip) {\n      books {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n          id\n          bookId\n          originalPrice\n          discountPrice\n          startDate\n          endDate\n          createdAt\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCart($id: String!) {\n    getCart(id: $id) {\n\t\t\tid\n\t\t\tuserId\n\t\t\tguestId\n\t\t\ttotal\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tpriceId\n\t\t\t\tbook {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\trating\n\t\t\t\t\timages\n\t\t\t\t\tprices {\n\t\t\t\t\t\tid\n\t\t\t\t\t\toriginalPrice\n\t\t\t\t\t\tdiscountPrice\n\t\t\t\t\t\tstartDate\n\t\t\t\t\t\tendDate\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tauthor {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n    }\n  }\n"): (typeof documents)["\n  query GetCart($id: String!) {\n    getCart(id: $id) {\n\t\t\tid\n\t\t\tuserId\n\t\t\tguestId\n\t\t\ttotal\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tpriceId\n\t\t\t\tbook {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\trating\n\t\t\t\t\timages\n\t\t\t\t\tprices {\n\t\t\t\t\t\tid\n\t\t\t\t\t\toriginalPrice\n\t\t\t\t\t\tdiscountPrice\n\t\t\t\t\t\tstartDate\n\t\t\t\t\t\tendDate\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tauthor {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories {\n    categories {\n        id\n        name\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n        id\n        name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;