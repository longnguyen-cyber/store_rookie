import { useQuery } from '@apollo/client'
import { GET_CART } from '../graphql/queries/cart'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import { InputChange } from '../utils/types'

const Cart = () => {
  const guestId = localStorage.getItem('guestId')

  const [book, setBook] = useState()
  const handleChangeQuantityOfBook = (e: InputChange, item) => {
    const quantity = e.target.value
    console.log(`Quantity of ${item.book.title}: ${quantity}`)
  }

  const handleChangeQuantity = (item) => {}

  const { data, error, loading } = useQuery(GET_CART, {
    variables: {
      id: guestId || '',
    },
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error! {error.message}</div>
  }
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {data?.getCart.items?.map((item, index) => {
              return (
                <div className="mb-6" key={index}>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className=" flex items-center justify-between gap-6">
                      <a href={`/book/${item.book.id}`} className="shrink-0">
                        <img
                          className="w-24 object-cover shadow-sm"
                          src={item.book.images[0]}
                          alt="imac image"
                        />
                      </a>

                      <div className="w-full  flex flex-col justify-start">
                        <a
                          href={`/book/${item.book.id}`}
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          <p>{item.book.title}</p>
                        </a>
                        <p className="mt-0">
                          <small>{item.book.description}</small>
                        </p>
                        <br />

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="inline-flex shrink-0 items-center justify-center rounded p-1 border border-gray-300 "
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          data-input-counter
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                          required
                          value={item.quantity}
                        />
                        <button
                          type="button"
                          className="inline-flex shrink-0 items-center justify-center rounded p-1 border border-gray-300 "
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="flex items-center justify-between md:justify-end">
                        <div className="text-end md:w-32">
                          <p className="text-base font-bold text-gray-900">
                            {item?.book.prices &&
                            item?.book.prices[0].discountPrice !== 0 ? (
                              <>
                                <span className="font-bold text-black text-xl">
                                  $
                                  {item?.book.prices[0].discountPrice.toFixed(
                                    2
                                  )}{' '}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold text-black text-xl">
                                $
                                {item?.book.prices &&
                                  item?.book.prices[0].originalPrice.toFixed(
                                    2
                                  )}{' '}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    ${data?.getCart.total}
                  </dd>
                </dl>
              </div>
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-4"
              >
                Proceed to Checkout
              </a>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {' '}
                  or{' '}
                </span>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-black underline hover:no-underline "
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
