import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Book } from '../generated/graphql'
import { AUTHOR_NAME } from '../graphql/queries/author'
import { GET_BOOKS_RECOMMENED } from '../graphql/queries/book'
import { CATEGORIES_NAME } from '../graphql/queries/categories'
import generateStar from '../utils/generateStart'
const Shop = () => {
  const { data: booksRecommend } = useQuery(GET_BOOKS_RECOMMENED)
  const { data: categories_name } = useQuery(CATEGORIES_NAME)
  const { data: authors_name } = useQuery(AUTHOR_NAME)

  const renderCard = (books: Book[]) => {
    if (books) {
      return books.map((book, index) => {
        return (
          <Link
            to={`/book/${book.id}`}
            key={index}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="p-8 rounded-t-lg"
              src={book.images[0]}
              alt="product image"
            />
            <div className="px-5 pb-5">
              <a href="#">
                <p className="text-xl font-semibold tracking-tight text-gray-900">
                  {book.title}
                </p>
                <small className="text-white">{book.description}</small>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex">
                  {book.rating} {generateStar(book.rating)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                {book.prices && book.prices[0].discountPrice ? (
                  <>
                    <span className="text-gray-400 line-through">
                      ${book.prices[0].originalPrice}
                    </span>
                    <span className="font-bold text-white">
                      ${book.prices[0].discountPrice}{' '}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-white">
                    ${book.prices && book.prices[0].originalPrice}{' '}
                  </span>
                )}
              </div>
            </div>
          </Link>
        )
      })
    }
  }
  return (
    <div>
      {/* <Navbar /> */}
      <br />
      <h1 className="text-2xl ml-20 ">Filter</h1>

      <div className="flex mx-20 space-x-4">
        <div className="w-40 space-y-2">
          <div className="rounded border border-black p-3">
            <h1 className="text-lg font-semibold text-gray-900">Categories</h1>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {categories_name?.categories.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="rounded border border-black p-3">
            <h1 className="text-lg font-semibold text-gray-900">Authors</h1>
            <select
              id="author"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {authors_name?.authors.map((author, index) => {
                return (
                  <option key={index} value={author.id}>
                    {author.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="rounded border border-black p-3">
            <h1 className="text-lg font-semibold text-gray-900">
              Rating review
            </h1>
            <ul>
              <li className="space-x-1">
                <input type="radio" id="rating5" name="rating" value="5" />
                <label htmlFor="rating5">5 stars</label>
              </li>
              <li className="space-x-1">
                <input type="radio" id="rating4" name="rating" value="4" />
                <label htmlFor="rating4">4 stars</label>
              </li>
              <li className="space-x-1">
                <input type="radio" id="rating3" name="rating" value="3" />
                <label htmlFor="rating3">3 stars</label>
              </li>
              <li className="space-x-1">
                <input type="radio" id="rating2" name="rating" value="2" />
                <label htmlFor="rating2">2 stars</label>
              </li>
              <li className="space-x-1">
                <input type="radio" id="rating1" name="rating" value="1" />
                <label htmlFor="rating1">1 stars</label>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end flex-col items-end space-y-3">
          <form className="max-w-sm">
            <select
              id="sort"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="sale" selected>
                Sort by on sale
              </option>
              <option value="popular">Sort by popularity</option>
              <option value="asc">Sort by price: low to high </option>
              <option value="desc">Sort by price: high to low</option>
            </select>
          </form>

          <div className="grid grid-cols-4 gap-4">
            {renderCard(booksRecommend?.recommendBooks as Book[])}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Shop
