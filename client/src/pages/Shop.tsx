/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { Book, FilterBookDto } from '../generated/graphql'

import ScrollToTopButton from '../components/Scroll'
import { AUTHOR_NAME } from '../graphql/queries/author'
import { GET_BOOKS_FILTER } from '../graphql/queries/book'
import { CATEGORIES_NAME } from '../graphql/queries/categories'
import generateStar from '../utils/generateStart'
import { InputChange, QUERY_SORT } from '../utils/types'
const Shop = () => {
  const [allQuantity, setAllQuantity] = useState('')
  const [quantityLeft, setQuantityLeft] = useState(0)
  const [page, setPage] = useState(0)

  const [getBooks] = useLazyQuery(GET_BOOKS_FILTER, {
    variables: {
      filter: {
        rating: [],
        author: [],
        category: [],
        sortByEnum: QUERY_SORT.ASC,
        skip: 0,
      },
    },
    onCompleted(data) {
      if (data) {
        setAllQuantity(`All books has ${data.booksFilter.total} books`)
        const newBooks = data.booksFilter.books as Book[]
        setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
        const newLength = (books?.length ?? 0) + newBooks.length
        setQuantityLeft(data.booksFilter.total - newLength)
        if (data?.booksFilter.total === newLength) {
          setDisableMore(true)
        }
      }
    },
  })

  const [disableMore, setDisableMore] = useState(false)
  const [typeFilter, setTypeFilter] = useState<FilterBookDto>({
    rating: [],
    author: [],
    category: [],
    sortByEnum: QUERY_SORT.ASC,
    skip: 0,
  })

  const { data: categories_name } = useQuery(CATEGORIES_NAME)
  const { data: authors_name } = useQuery(AUTHOR_NAME)

  const [books, setBooks] = useState<Book[] | null>(null)

  const handleChangeFilter = (e: InputChange) => {
    const { name, value } = e.target

    setPage(0)
    setBooks([])
    setDisableMore(false)
    setAllQuantity('')
    setQuantityLeft(0)
    setTypeFilter((prevState) => {
      if (name === 'author' || name === 'category' || name === 'rating') {
        const [id] = value.split('-')

        return { ...prevState, [name]: id ? [id] : [] }
      } else if (name === 'sort') {
        return { ...prevState, sortByEnum: value as QUERY_SORT }
      } else {
        return prevState
      }
    })
  }
  useEffect(() => {
    getBooks({
      variables: {
        filter: {
          ...typeFilter,
          skip: page * 4,
        },
      },
      onCompleted(data) {
        if (data) {
          setAllQuantity(`All books has ${data.booksFilter.total} books`)
          const newBooks = data.booksFilter.books as Book[]
          setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
          const newLength = (books?.length ?? 0) + newBooks.length
          setQuantityLeft(data.booksFilter.total - newLength)
          if (data?.booksFilter.total === newLength) {
            setDisableMore(true)
          }
        }
      },
    })
  }, [page])

  useEffect(() => {
    console.log('typeFilter', typeFilter)
    getBooks({
      variables: {
        filter: {
          ...typeFilter,
          skip: 0,
        },
      },
      onCompleted(data) {
        if (data) {
          setAllQuantity(`All books has ${data.booksFilter.total} books`)
          const newBooks = data.booksFilter.books as Book[]
          setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
          const newLength = (books?.length ?? 0) + newBooks.length
          setQuantityLeft(data.booksFilter.total - newLength)
          if (data?.booksFilter.total === newLength) {
            setDisableMore(true)
          }
        }
      },
    })
    console.log('typeFilter', typeFilter)
  }, [typeFilter])

  // filter: { author: ["1"],category:["2"], sortByEnum: "asc", skip: 0, rating: [3,2, 5, 1] }

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
              className="p-8 rounded-t-lg w-full h-96 object-contain"
              src={book.images[0]}
              alt="product image"
            />
            <div className="px-5 pb-5">
              <p className="text-xl font-semibold tracking-tight text-white">
                {book.title}
              </p>
              <small className="text-white">{book.description}</small>
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

  if (!categories_name || !authors_name) {
    return <Loading />
  }

  return (
    <div>
      {/* <Navbar /> */}
      <br />
      <h1 className="text-2xl ml-20 ">Filter</h1>

      <ScrollToTopButton />

      <div className="flex mx-20 space-x-4">
        <div className="w-40 space-y-2">
          <div className="rounded border border-black p-3">
            <h1 className="text-lg font-semibold text-gray-900">Category</h1>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="category"
              onChange={handleChangeFilter}
            >
              <option value={''} defaultValue={''}>
                Choose category
              </option>
              {categories_name?.categories.map((category, index) => {
                return (
                  <option key={index} value={`${category.id}-${category.name}`}>
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
              name="author"
              onChange={handleChangeFilter}
            >
              <option value={''} defaultValue={''}>
                Choose author
              </option>

              {authors_name?.authors.map((author, index) => {
                return (
                  <option key={index} value={`${author.id}-${author.name}`}>
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
              <li className="space-x-2 flex">
                <input
                  type="radio"
                  id="rating5"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="5"
                />
                <label htmlFor="rating5" className="flex items-center">
                  5 {generateStar(5)}
                </label>
              </li>
              <li className="space-x-2 flex">
                <input
                  type="radio"
                  id="rating4"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="4"
                />
                <label htmlFor="rating4" className="flex items-center">
                  4 {generateStar(4)}
                </label>
              </li>
              <li className="space-x-2 flex">
                <input
                  type="radio"
                  id="rating3"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="3"
                />
                <label htmlFor="rating3" className="flex items-center">
                  3 {generateStar(3)}
                </label>
              </li>
              <li className="space-x-2 flex">
                <input
                  type="radio"
                  id="rating2"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="2"
                />
                <label htmlFor="rating2" className="flex items-center">
                  2 {generateStar(2)}
                </label>
              </li>
              <li className="space-x-2 flex">
                <input
                  type="radio"
                  id="rating1"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="1"
                />
                <label htmlFor="rating1" className="flex items-center">
                  1 {generateStar(1)}
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex space-y-3 flex-col">
          <div className="flex items-center space-x-4">
            <form className="max-w-sm">
              <select
                id="sort"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="sort"
                onChange={handleChangeFilter}
              >
                <option value={QUERY_SORT.ASC} defaultValue={QUERY_SORT.ASC}>
                  Sort by price: low to high{' '}
                </option>
                <option value={QUERY_SORT.DESC}>
                  Sort by price: high to low
                </option>
                <option value={QUERY_SORT.SALE}>Sort by on sale</option>
                <option value={QUERY_SORT.POPULAR}>Sort by popularity</option>
              </select>
            </form>
            <h1>
              <strong>{allQuantity !== '' && allQuantity}</strong>
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-4">{renderCard(books!)}</div>
          {!disableMore && (
            <button
              type="button"
              className={`bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded px-4 py-1 focus:ring-gray-100  focus:ring-2 focus:outline-none w-fit mx-auto mt-5`}
              onClick={() => {
                setPage(page + 1)
                setQuantityLeft(quantityLeft - 4)
              }}
            >
              More {quantityLeft > 0 && `(${quantityLeft} left)`}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Shop
