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
    "\n  query Authors {\n    authors {\n        id\n        name\n    }\n  }\n": types.AuthorsDocument,
    "\n  query PromotionsOnSale {\n    promotionsOnSale {\n        id\n        bookId\n        promotionType\n        startDate\n        endDate\n        book {\n            id\n            title\n            description\n            categoryId\n            rating\n            ratings\n            images\n            createdAt\n            prices {\n                id\n                bookId\n                originalPrice\n                discountPrice\n                startDate\n                endDate\n                createdAt\n            }\n        }\n    }\n  }\n": types.PromotionsOnSaleDocument,
    "\n  query RecommendBooks {\n    recommendBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n": types.RecommendBooksDocument,
    "\n  query PopularBooks {\n    popularBooks {\n        id\n        title\n        description\n        categoryId\n        rating\n        ratings\n        images\n        createdAt\n        prices {\n            id\n            bookId\n            originalPrice\n            discountPrice\n            startDate\n            endDate\n            createdAt\n        }\n    }\n  }\n": types.PopularBooksDocument,
    "\n  query GetBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      description\n      rating\n      ratings\n      images\n      prices {\n          originalPrice\n          discountPrice\n      }\n      category {\n        name\n      }\n      authors {\n          author {\n              name\n          }\n      }\n    }\n  }\n": types.GetBookDocument,
    "\n  query reviewsByBook($id: String!, $skip: String!, $take: String!) {\n    reviewsByBook(bookId: $id, skip: $skip, take: $take) {\n      totalPage\n        reviews {\n          id\n          rating\n          title\n          content\n          createdAt\n          user {\n            username\n          }\n      }\n    }\n  }\n": types.ReviewsByBookDocument,
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
export function gql(source: "\n  query Authors {\n    authors {\n        id\n        name\n    }\n  }\n"): (typeof documents)["\n  query Authors {\n    authors {\n        id\n        name\n    }\n  }\n"];
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
export function gql(source: "\n  query GetBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      description\n      rating\n      ratings\n      images\n      prices {\n          originalPrice\n          discountPrice\n      }\n      category {\n        name\n      }\n      authors {\n          author {\n              name\n          }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      description\n      rating\n      ratings\n      images\n      prices {\n          originalPrice\n          discountPrice\n      }\n      category {\n        name\n      }\n      authors {\n          author {\n              name\n          }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query reviewsByBook($id: String!, $skip: String!, $take: String!) {\n    reviewsByBook(bookId: $id, skip: $skip, take: $take) {\n      totalPage\n        reviews {\n          id\n          rating\n          title\n          content\n          createdAt\n          user {\n            username\n          }\n      }\n    }\n  }\n"): (typeof documents)["\n  query reviewsByBook($id: String!, $skip: String!, $take: String!) {\n    reviewsByBook(bookId: $id, skip: $skip, take: $take) {\n      totalPage\n        reviews {\n          id\n          rating\n          title\n          content\n          createdAt\n          user {\n            username\n          }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories {\n    categories {\n        id\n        name\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n        id\n        name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;