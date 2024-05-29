import { gql } from '../../generated'

export const GET_BOOKS = gql(`
  query Books {
    books {
        id
        title
        description
        categoryId
        rating
        ratings
        images
        createdAt
        prices {
            id
            bookId
            originalPrice
            discountPrice
            startDate
            endDate
            createdAt
        }
    }
  }
`)

export const GET_BOOK_ONSALE = gql(`
  query PromotionsOnSale {
    promotionsOnSale {
        id
        bookId
        promotionType
        startDate
        endDate
        book {
            id
            title
            description
            categoryId
            rating
            ratings
            images
            createdAt
            prices {
                id
                bookId
                originalPrice
                discountPrice
                startDate
                endDate
                createdAt
            }
        }
    }
  }
`)

export const GET_BOOKS_RECOMMENED = gql(`
  query RecommendBooks {
    recommendBooks {
        id
        title
        description
        categoryId
        rating
        ratings
        images
        createdAt
        prices {
            id
            bookId
            originalPrice
            discountPrice
            startDate
            endDate
            createdAt
        }
    }
  }
`)

export const GET_BOOKS_POPULAR = gql(`
  query PopularBooks {
    popularBooks {
        id
        title
        description
        categoryId
        rating
        ratings
        images
        createdAt
        prices {
            id
            bookId
            originalPrice
            discountPrice
            startDate
            endDate
            createdAt
        }
    }
  }
`)

export const GET_BOOK_BY_ID = gql(`
  query GetBook($id: String!) {
    book(id: $id) {
      id
      title
      description
      rating
      ratings
      images
      prices {
        id
        originalPrice
        discountPrice
      }
      category {
        name
      }
      authors {
        author {
            name
        }
      }
    }
  }
`)
export const GET_REVIEWS_BY_BOOK = gql(`
  query reviewsByBook($id: String!, $skip: String!, $take: String!) {
    reviewsByBook(bookId: $id, skip: $skip, take: $take) {
      totalPage
        reviews {
          id
          rating
          title
          content
          createdAt
          user {
            username
          }
      }
    }
  }
`)
