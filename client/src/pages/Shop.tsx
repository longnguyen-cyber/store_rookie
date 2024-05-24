import { useQuery } from '@apollo/client'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Book } from '../generated/graphql'
import { GET_BOOKS_RECOMMENED } from '../graphql/queries/book'
import generateStar from '../utils/generateStart'
const Shop = () => {
  const { data: booksRecommend } = useQuery(GET_BOOKS_RECOMMENED)

  const renderCard = (books: Book[]) => {
    if (books) {
      return books.map((book, index) => {
        return (
          <div
            key={index}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={book.images[0]}
                alt="product image"
              />
            </a>
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
                <span className="text-gray-400 line-through">
                  ${book.prices && book.prices[0].originalPrice}
                </span>
                <span className=" font-bold text-gray-900">
                  ${book.prices && book.prices[0].discountPrice}{' '}
                </span>
              </div>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <div>
      <Navbar />
      <br />
      <h1 className="text-2xl ml-20 ">Filter</h1>

      <div className="flex mx-20 space-x-4">
        <div className="w-36">
          <div className="rounded border border-black p-3">
            <h1 className="text-lg font-semibold text-gray-900">Categories</h1>
            <ul className="">
              <li>
                <a
                  href="#"
                  className="block p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Fiction
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Non-Fiction
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Fantasy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Mystery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Romance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end flex-col items-end space-y-3">
          <form className="max-w-sm">
            <select
              id="sort"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
