import { useLazyQuery } from '@apollo/client'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_BOOK_BY_ID, GET_REVIEWS_BY_BOOK } from '../graphql/queries/book'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const BookDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const updateUrl = (page: number) => {
    if (page > 0) {
      navigate(`/book/${id}?page=${page + 1}&limit=2`)
    } else {
      navigate(`/book/${id}`)
    }
  }

  const [page, setPage] = useState(0)

  const [getBook, { data: bookData }] = useLazyQuery(GET_BOOK_BY_ID, {
    variables: { id: id ?? '' },
  })
  const [getReviews, { data: reviews, loading }] = useLazyQuery(
    GET_REVIEWS_BY_BOOK,
    {
      variables: { id: id ?? '', skip: page * 2 + '', take: '2' },
    }
  )
  const nextPage = () => {
    setPage(page + 1)
    updateUrl(page + 1)
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1)
      updateUrl(page - 1)
    }
  }

  useEffect(() => {
    getBook()
  }, [id])

  useEffect(() => {
    getReviews()
  }, [page])
  const [quantity, setQuantity] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (!loading) {
      setTotalPages(reviews?.reviewsByBook.totalPage ?? 0)
    }
  }, [loading, reviews])

  return (
    <div className="mx-72 mt-10 space-y-4">
      <div className="grid grid-cols-12 space-x-4 ">
        <div className="col-span-7 rounded overflow-hidden space-x-6 border flex">
          <div>
            <img src={bookData?.book.images[0]} width={150} alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{bookData?.book.title}</h1>
            <p>
              By(author):{' '}
              {bookData?.book.authors
                ?.map((item) => item.author.name)
                .join(', ')}
            </p>
            <p>Publisher: {bookData?.book.category.name}</p>
            <br />
            <p>{bookData?.book.description}</p>
            <br />
          </div>
        </div>
        <div className="col-span-5 rounded border">
          <p className="px-5 py-2 pl-5 bg-gray-200 text-center">
            {bookData?.book.prices && bookData?.book.prices[0].discountPrice ? (
              <>
                <small className="text-gray-400 line-through">
                  ${bookData?.book.prices[0].originalPrice}
                </small>
                <span className="font-bold text-black text-3xl">
                  ${bookData?.book.prices[0].discountPrice}{' '}
                </span>
              </>
            ) : (
              <span className="font-bold text-black text-xl">
                $
                {bookData?.book.prices &&
                  bookData?.book.prices[0].originalPrice}{' '}
              </span>
            )}
          </p>

          <br />
          <br />
          <div className="mx-20">
            <span>Quantity</span>
            <div className="relative flex items-center w-full">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className={`bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none ${
                  quantity === 1 ? 'cursor-not-allowed ' : ''
                }`}
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <svg
                  className="w-3 h-3 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
                required
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className={`bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none ${
                  quantity === 99 ? 'cursor-not-allowed ' : ''
                }`}
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity === 99}
              >
                <svg
                  className="w-3 h-3 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none w-full py-2 mt-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 space-x-4">
        <div className="col-span-7 rounded overflow-hidden p-4 space-x-6 border">
          <h1 className="ml-6">
            Reviews
            <small className="text-gray-300">(Filter by 5 star)</small>
          </h1>
          <h1 className="text-2xl font-bold ">{bookData?.book.rating} star</h1>
          <div className="flex space-x-3">
            <span className="underline"></span>
            <div className="flex">
              {bookData?.book.ratings?.map((item: number, index: number) => {
                return (
                  <div key={index}>
                    <span className="underline">
                      {bookData.book.ratings.length - index} star
                      <span>({item})</span>
                      <span className="mx-[5px]">|</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            {reviews?.reviewsByBook.reviews.map((item, index: number) => {
              const date = parseISO(item.createdAt)
              const formattedDate = format(date, 'dd MMMM, yyyy HH:mm:ss')

              return (
                <div key={index} className="border p-4 rounded mt-4">
                  <div className="">
                    <p>
                      <strong>
                        <i>{item.user.username}</i>
                      </strong>
                    </p>
                    <span>
                      {item.title} | {item.rating} star
                    </span>
                    <p>{item.content}</p>
                    <p>{formattedDate}</p>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={prevPage}
                disabled={page === 0}
                className={`${
                  page === 0 ? 'cursor-not-allowed text-gray-300' : ''
                } p-2 border rounded`}
              >
                <MdArrowBackIos />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  className={`mx-1 px-2 py-1 border rounded ${
                    page === i ? 'bg-blue-500 text-white font-bold' : ''
                  }`}
                  key={i}
                  onClick={() => {
                    setPage(i)
                    updateUrl(i)
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={page >= Math.ceil(totalPages) - 1}
                className={`${
                  page >= Math.ceil(totalPages) - 1
                    ? 'cursor-not-allowed text-gray-300'
                    : ''
                } p-2 border rounded`}
              >
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 rounded border h-fit">
          <h1 className="font-bold text-xl text-center border-b py-3">
            Write review
          </h1>
          <form className="max-w mx-8 py-5">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Title
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your title"
                required
              />
            </div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={5}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Write a content..."
              defaultValue={''}
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none w-2/3 py-2 mt-2 mx-auto flex justify-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
