import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { PLACE_ORDER } from '../graphql/mutations/order'
import { GET_CART } from '../graphql/queries/cart'
import { useAuth } from '../provider/auth-provider'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const guestId = localStorage.getItem('guestId')
  const navigate = useNavigate()

  const auth = useAuth()
  const { data } = useQuery(GET_CART, {
    variables: {
      id: guestId ?? '',
    },
  })

  const [prices, setPrices] = useState({
    total: 0,
    shipping: 0,
  })
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [placeOrder, { loading }] = useMutation(PLACE_ORDER, {
    refetchQueries: [GET_CART, 'GetCart'],
    onCompleted: () => {
      navigate('/')
    },
  })
  useEffect(() => {
    if (data) {
      setPrices({
        total: parseFloat(data?.getCart.total ?? ''),
        shipping: parseFloat(data?.getCart.total ?? '') * 0.1,
      })
    }
  }, [data])

  const handlePlaceOrder = () => {
    if (data?.getCart.items) {
      placeOrder({
        variables: {
          data: {
            items: {
              createMany: {
                data: data?.getCart.items.map((item) => ({
                  bookId: item.book.id,
                  quantity: item.quantity,
                  priceId: item.book.prices ? item.book.prices[0].id : '',
                })),
              },
            },
            address,
            payment: paymentMethod,
            shipping: prices.shipping,
          },
          guestId: guestId ?? '',
        },
      })
    }
  }

  const Loading = () => (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )

  if (auth?.token === null) {
    navigate('/login')
  }

  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          sneekpeeks
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Place order</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {data?.getCart.items?.map((item, index) => {
              return (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row border-b"
                  key={index}
                >
                  <img
                    className="m-2  w-20 rounded-md border object-cover object-center"
                    src={item.book.images[0]}
                    alt={item.book.title}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.book.title}</span>
                    <span className="float-right text-gray-400">
                      {item?.book.prices &&
                      item?.book.prices[0].discountPrice !== 0 ? (
                        <>
                          <span className="font-bold text-black text-xl">
                            ${item?.book.prices[0].discountPrice.toFixed(2)}{' '}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-black text-xl">
                          $
                          {item?.book.prices &&
                            item?.book.prices[0].originalPrice.toFixed(2)}{' '}
                        </span>
                      )}
                    </span>
                    <small>x {item.quantity} </small>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                value={auth?.user?.email}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                value={auth?.user?.username}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                  maxLength={200}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
            </div>

            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Payment Method
            </label>
            <form className="mt-5 grid grid-cols-2 gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  defaultChecked
                  value="cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-2 w-2 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white" />
                <label
                  className="py-1 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 "
                  htmlFor="radio_1"
                >
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash</span>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  value="visa"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-2 w-2 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white" />
                <label
                  className="py-1 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 "
                  htmlFor="radio_2"
                >
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Visa</span>
                  </div>
                </label>
              </div>
            </form>
            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  ${prices.total.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">
                  ${prices.shipping.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${(prices.total + prices.shipping).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white flex justify-center"
          >
            {/* {true ? <Loading /> : 'Place Order'} */}
            Place order {loading && <Loading />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
