import { gql } from '../../generated'

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
