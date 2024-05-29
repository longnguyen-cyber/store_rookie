import { gql } from '../../generated'

export const BOOKS_BY_RATING = gql(`
  query BooksByRating($star: String!, $type: String!) {
    booksByRating(star: $star, type: $type) {
      title
      description
      categoryId
      rating
      ratings
      images
      createdAt
      id
      prices {
        id
        bookId
        originalPrice
        discountPrice
        startDate
        endDate
        createdAt
      }
      promotions {
        id
        bookId
        promotionType
        startDate
        endDate
      }
    }
  }
`)

export const BOOKS_BY_CATEGORY = gql(`
  query BooksByCategory($category_id: String!, $type: String!) {
    booksByCategory(category_id: $category_id, type: $type) {
      title
      description
      categoryId
      rating
      ratings
      images
      createdAt
      id
      prices {
        id
        bookId
        originalPrice
        discountPrice
        startDate
        endDate
        createdAt
      }
      promotions {
        id
        bookId
        promotionType
        startDate
        endDate
      }
    }
  }
`)

export const BOOKS_BY_AUTHOR = gql(`
  query BooksByAuthor($author_id: String!, $type: String!) {
    booksByAuthor(author_id: $author_id, type: $type) {
      title
      description
      categoryId
      rating
      ratings
      images
      createdAt
      id
      prices {
        id
        bookId
        originalPrice
        discountPrice
        startDate
        endDate
        createdAt
      }
      promotions {
        id
        bookId
        promotionType
        startDate
        endDate
      }
    }
  }
`)
