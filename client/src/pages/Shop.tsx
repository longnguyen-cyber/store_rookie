/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { Book } from '../generated/graphql'

import { AUTHOR_NAME } from '../graphql/queries/author'
import {
  BOOKS_BY_AUTHOR,
  BOOKS_BY_CATEGORY,
  BOOKS_BY_RATING,
  GET_BOOKS,
} from '../graphql/queries/book'
import { CATEGORIES_NAME } from '../graphql/queries/categories'
import generateStar from '../utils/generateStart'
import { InputChange, QUERY_SORT } from '../utils/types'
const Shop = () => {
  const defaultFilter = {
    categories: '',
    author: '',
    rating: '',
  }

  const navigate = useNavigate()
  const [allQuantity, setAllQuantity] = useState('')
  const [quantityLeft, setQuantityLeft] = useState(0)
  const [page, setPage] = useState(0)

  const [getBooks, { data }] = useLazyQuery(GET_BOOKS, {
    variables: {
      skip: page * 4 + '',
      type: 'asc',
    },
  })

  const [disableMore, setDisableMore] = useState(false)
  const [typeFilter, setTypeFilter] = useState('' as string)

  const { data: categories_name } = useQuery(CATEGORIES_NAME)
  const { data: authors_name } = useQuery(AUTHOR_NAME)

  const [books, setBooks] = useState<Book[] | null>(null)

  const [booksByRating] = useLazyQuery(BOOKS_BY_RATING)
  const [booksByAuthor] = useLazyQuery(BOOKS_BY_AUTHOR)
  const [booksByCategory] = useLazyQuery(BOOKS_BY_CATEGORY)

  const [filter, setFilter] = useState(defaultFilter)
  const [sort, setSort] = useState('asc')

  const handleChangeFilter = (e: InputChange) => {
    setFilter(defaultFilter)
    if (e.target.value === '') {
      return
    }
    setPage(0)
    setBooks([])
    setDisableMore(false)
    setAllQuantity('')
    setQuantityLeft(0)
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    const filterSelected = Object.fromEntries(
      Object.entries(filter).filter(
        ([key, value]) =>
          value !== defaultFilter[key as keyof typeof defaultFilter]
      )
    )

    if (!filterSelected || Object.keys(filterSelected).length === 0) {
      getBooks({
        variables: {
          skip: page * 4 + '',
          type: sort,
        },
        onCompleted(data) {
          setAllQuantity(`All books has ${data.books.total} books`)
          const newBooks = data.books.books as Book[]
          setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
          const newLength = (books?.length ?? 0) + newBooks.length
          setQuantityLeft(data.books.total - newLength)
          if (data?.books.total === newLength || newBooks.length === 0) {
            setDisableMore(true)
          }
        },
      })
      return
    }

    const [firstKey, firstValue] = Object.entries(filterSelected)[0] || []
    const name = firstValue.toString().split('-')[1] ?? firstValue
    if (firstKey && firstValue) {
      updateUrl(firstKey, name, sort)
    }
    if (firstKey === 'rating') {
      setTypeFilter('rating')
      booksByRating({
        variables: {
          star: name,
          type: sort,
          skip: '0',
        },
        onCompleted(data) {
          setBooks(data.booksByRating.books as Book[])
          const newLength =
            (books?.length ?? 0) + data.booksByRating.books.length
          if (data?.booksByRating.total === newLength || newLength === 0) {
            setDisableMore(true)
          }
        },
      })
    } else if (firstKey === 'author') {
      setTypeFilter('author')
      booksByAuthor({
        variables: {
          author_id: firstValue.toString().split('-')[0],
          type: sort,
          skip: '0',
        },
        onCompleted(data) {
          setAllQuantity(`${name} has ${data.booksByAuthor.total} books`)
          setBooks(data.booksByAuthor.books as Book[])
          const newLength =
            (books?.length ?? 0) + data.booksByAuthor.books.length
          console.log('newLength', newLength)
          setQuantityLeft(data.booksByAuthor.total - newLength)
          if (data?.booksByAuthor.total === newLength || newLength === 0) {
            setDisableMore(true)
          }
        },
      })
    } else {
      if (firstKey === 'categories') {
        setTypeFilter('categories')
        booksByCategory({
          variables: {
            category_id: firstValue.toString().split('-')[0],
            type: sort,
            skip: '0',
          },
          onCompleted(data) {
            setAllQuantity(`${name} has ${data.booksByCategory.total} books`)
            console.log('data', data)
            setBooks(data.booksByCategory.books as Book[])
            const newLength =
              (books?.length ?? 0) + data.booksByCategory.books.length
            setQuantityLeft(data.booksByCategory.total - newLength)
            if (data?.booksByCategory.total === newLength || newLength === 0) {
              setDisableMore(true)
            }
          },
        })
      }
    }
  }, [filter, sort])

  const updateUrl = (filter: string, name: string, sort: string) => {
    navigate(`/shop?${filter}=${name}&sort=${sort}`)
  }

  useEffect(() => {
    const filterSelected = Object.fromEntries(
      Object.entries(filter).filter(
        ([key, value]) =>
          value !== defaultFilter[key as keyof typeof defaultFilter]
      )
    )

    if (!filterSelected || Object.keys(filterSelected).length === 0) {
      getBooks({
        variables: {
          skip: page * 4 + '',
          type: sort,
        },
        onCompleted(data) {
          setAllQuantity(`All books has ${data.books.total} books`)
          const newBooks = data.books.books as Book[]
          setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
          const newLength = (books?.length ?? 0) + newBooks.length
          setQuantityLeft(data.books.total - newLength)
          if (data?.books.total === newLength || newBooks.length === 0) {
            setDisableMore(true)
          }
        },
      })
    } else {
      const [_, firstValue] = Object.entries(filterSelected)[0] || []
      const name = firstValue.toString().split('-')[1] ?? firstValue
      if (typeFilter === 'rating') {
        booksByRating({
          variables: {
            star: name,
            type: sort,
            skip: page * 4 + '',
          },
          onCompleted(data) {
            const newBooks = data.booksByRating.books as Book[]
            setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
            const newLength = (books?.length ?? 0) + newBooks.length
            if (
              data?.booksByRating.total === newLength ||
              newBooks.length === 0
            ) {
              setDisableMore(true)
            }
          },
        })
      } else if (typeFilter === 'author') {
        booksByAuthor({
          variables: {
            author_id: firstValue.toString().split('-')[0],
            type: sort,
            skip: page * 4 + '',
          },
          onCompleted(data) {
            const newBooks = data.booksByAuthor.books as Book[]
            setAllQuantity(`${name} has ${data.booksByAuthor.total} books`)
            setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
            const newLength = (books?.length ?? 0) + newBooks.length
            setQuantityLeft(data.booksByAuthor.total - newLength)
            if (
              data?.booksByAuthor.total === newLength ||
              newBooks.length === 0
            ) {
              setDisableMore(true)
            }
          },
        })
      } else if (typeFilter === 'categories') {
        booksByCategory({
          variables: {
            category_id: firstValue.toString().split('-')[0],
            type: sort,
            skip: page * 4 + '',
          },
          onCompleted(data) {
            setAllQuantity(`${name} has ${data.booksByCategory.total} books`)
            const newBooks = data.booksByCategory.books as Book[]
            setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
            const newLength = (books?.length ?? 0) + newBooks.length
            setQuantityLeft(data.booksByCategory.total - newLength)
            if (
              data?.booksByCategory.total === newLength ||
              newBooks.length === 0
            ) {
              setDisableMore(true)
            }
          },
        })
      }
    }
  }, [page])
  // useEffect(() => {
  //   const filterSelected = Object.fromEntries(
  //     Object.entries(filter).filter(
  //       ([key, value]) =>
  //         value !== defaultFilter[key as keyof typeof defaultFilter]
  //     )
  //   )

  //   if (!filterSelected || Object.keys(filterSelected).length === 0) {
  //     console.log('here')
  //     if (data) {
  //       setAllQuantity(`All books has ${data.books.total} books`)
  //       const newBooks = data.books.books as Book[]
  //       setBooks((prevBooks) => [...(prevBooks ?? []), ...newBooks])
  //       const newLength = (books?.length ?? 0) + newBooks.length
  //       setQuantityLeft(data.books.total - newLength)
  //       if (data?.books.total === newLength) {
  //         setDisableMore(true)
  //       }
  //     }
  //   }
  // }, [data])

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

  // console.log()

  if (!categories_name || !authors_name) {
    return <Loading />
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
              name="categories"
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
              <li className="space-x-1">
                <input
                  type="radio"
                  id="rating5"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="5"
                />
                <label htmlFor="rating5">5 stars</label>
              </li>
              <li className="space-x-1">
                <input
                  type="radio"
                  id="rating4"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="4"
                />
                <label htmlFor="rating4">4 stars</label>
              </li>
              <li className="space-x-1">
                <input
                  type="radio"
                  id="rating3"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="3"
                />
                <label htmlFor="rating3">3 stars</label>
              </li>
              <li className="space-x-1">
                <input
                  type="radio"
                  id="rating2"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="2"
                />
                <label htmlFor="rating2">2 stars</label>
              </li>
              <li className="space-x-1">
                <input
                  type="radio"
                  id="rating1"
                  name="rating"
                  onChange={handleChangeFilter}
                  value="1"
                />
                <label htmlFor="rating1">1 stars</label>
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
                onChange={(e) => {
                  setSort(e.target.value)
                  setPage(0)
                  setDisableMore(false)
                  setBooks([])
                }}
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
