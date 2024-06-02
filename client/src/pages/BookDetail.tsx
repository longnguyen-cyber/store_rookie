/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from '@apollo/client'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa6'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import { ADD_ITEM_TO_CART } from '../graphql/mutations/cart'
import { CREATE_REVIEW } from '../graphql/mutations/review'
import { GET_BOOK_BY_ID, GET_REVIEWS_BY_BOOK } from '../graphql/queries/book'
import { GET_CART } from '../graphql/queries/cart'
import { useAuth } from '../provider/auth-provider'
import { FormSubmit, InputChange } from '../utils/types'

const BookDetail = () => {
  const { id } = useParams<{ id: string }>()
  const guestId = localStorage.getItem('guestId')
  const navigate = useNavigate()
  const [review, setReview] = useState({
    title: '',
    content: '',
    rating: 0,
    id: '',
  })
  const [isEdit, setIsEdit] = useState(false)
  const [rating, setRating] = useState(0)

  const handleStarHover = (index: number) => {
    setRating(index)
    setReview({ ...review, rating: index })
  }
  const [createReview] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      toast.success('Review created successfully')
      setReview({ title: '', content: '', rating: 0, id: '' })
      setRating(0)
      setIsEdit(false)
    },
    refetchQueries: [
      { query: GET_REVIEWS_BY_BOOK, variables: { bookId: id } },
      { query: GET_BOOK_BY_ID, variables: { bookId: id } },
      'reviewsByBook',
      'GetBook',
    ],
    onError: (error) => {
      // setReview({ title: '', content: '', rating: 0, id: '' })
      // setRating(0)
      toast.error(error.message)
    },
  })

  const handleChangeInput = (e: InputChange) => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }
  const handleSumitReview = (e: FormSubmit) => {
    e.preventDefault()
    if (!review.title || !review.content) {
      return toast.error('Please fill all fields')
    } else if (rating === 0) {
      return toast.error('Please select rating')
    }
    const data = {
      data: {
        book: { connect: { id: id } },
        title: review.title,
        content: review.content,
        rating: review.rating,
        id: '',
        isEdit: false,
      },
    }
    if (isEdit) {
      data.data.id = review.id
      data.data.isEdit = true
      console.log('Edit data:', data)
    } else {
      console.log('Data:', data)
    }
    createReview({
      variables: data,
    })
  }

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
      variables: { id: id ?? '', skip: page * 5 + '', take: '5' },
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

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted: () => {
      toast.success('Add item to cart successfully')
      setQuantity(1)
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    },
    refetchQueries: [GET_CART, 'GetCart'],
  })
  const auth = useAuth()
  const handleAddToCart = () => {
    if (bookData?.book.prices && guestId) {
      addItemToCart({
        variables: {
          items: {
            quantity,
            priceId: bookData?.book.prices[0]?.id,
            book: { connect: { id: bookData?.book.id } },
            cart: {},
          },
          userId: auth?.user?.id ?? guestId,
          type: auth?.user?.id ? 'user' : 'guest',
        },
      })
    }
  }

  if (!bookData || loading) {
    return <Loading />
  }

  return (
    <div className="mx-72 mt-10 space-y-4">
      <ToastContainer />
      <div className="grid grid-cols-12 space-x-4 ">
        <div className="col-span-8 rounded overflow-hidden space-x-6 border flex items-start">
          <img
            src={bookData?.book.images[0]}
            className="object-contain "
            width={300}
            alt=""
          />
          <div>
            <h1 className="text-4xl mt-2 font-semibold">
              {bookData?.book.title}
            </h1>
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
        <div className="col-span-4 rounded border h-fit pb-4">
          <p className="px-5 py-2 pl-5 bg-gray-200 text-center">
            {bookData?.book.prices && bookData?.book.prices[0].discountPrice ? (
              <>
                <small className="text-gray-400 line-through">
                  ${bookData?.book.prices[0].originalPrice.toFixed(2)}
                </small>
                <span className="font-bold text-black text-3xl">
                  ${bookData?.book.prices[0].discountPrice.toFixed(2)}{' '}
                </span>
              </>
            ) : (
              <span className="font-bold text-black text-xl">
                $
                {bookData?.book.prices &&
                  bookData?.book.prices[0].originalPrice.toFixed(2)}{' '}
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
                <FaMinus />
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
                <FaPlus />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none w-full py-2 mt-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 space-x-4">
        <div className="col-span-8 rounded overflow-hidden p-4 space-x-6 border">
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
              const isEdited = item.createdAt !== item.updatedAt
              const date = parseISO(isEdited ? item.updatedAt : item.createdAt)
              const formattedDate = format(date, 'dd MMMM, yyyy HH:mm:ss')

              return (
                <div key={index} className="border p-4 rounded mt-4">
                  <div className="">
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <strong>
                          <i>{item.user.username}</i>
                          {auth?.user?.id === item.user.id && (
                            <span className="text-red-500"> (You)</span>
                          )}
                        </strong>
                        <span>
                          {formattedDate} {isEdited && <small>(edited)</small>}
                        </span>
                      </div>
                      {auth?.user?.id === item.user.id && (
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none p-2"
                          onClick={() => {
                            setReview({
                              content: item.content ?? '',
                              title: item.title,
                              rating: item.rating,
                              id: item.id,
                            })
                            setRating(item.rating)
                            setIsEdit(true)
                          }}
                        >
                          Edit review
                        </button>
                      )}
                    </div>
                    <span>
                      {item.title} | {item.rating} star
                    </span>
                    <p>{item.content}</p>
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
        <div className="col-span-4 rounded border h-fit">
          <h1 className="font-bold text-xl text-center border-b py-3">
            Write review
          </h1>
          <form className="max-w mx-8 py-5" onSubmit={handleSumitReview}>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={review.title}
                onChange={handleChangeInput}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your title"
                required
              />
            </div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your content
            </label>
            <textarea
              id="content"
              name="content"
              value={review.content}
              onChange={handleChangeInput}
              rows={5}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Write a content..."
            />

            <div className="flex space-x-4 items-center justify-center h-4 my-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  onMouseEnter={() => handleStarHover(index)}
                  className={`${
                    rating >= index ? 'text-yellow-500' : 'text-gray-400'
                  } cursor-pointer
          `}
                >
                  <FaStar />
                </span>
              ))}
            </div>
            {isEdit ? (
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none w-2/3 py-2 mt-2 mx-auto flex justify-center"
                >
                  Update your review
                </button>
                <button
                  type="reset"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  focus:outline-none w-2/3 py-2 mt-2 mx-auto flex justify-center"
                  onClick={() => {
                    setIsEdit(false)
                    setReview({ title: '', content: '', rating: 0, id: '' })
                    setRating(0)
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none w-2/3 py-2 mt-2 mx-auto flex justify-center"
              >
                Submit review
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
