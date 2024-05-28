import { useQuery } from '@apollo/client'
import { IoMdCart } from 'react-icons/io'
import { Outlet } from 'react-router-dom'
import { GET_CART } from '../graphql/queries/cart'

const Navbar = () => {
  const guestId = localStorage.getItem('guestId')
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
  console.log(data)
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex  p-4 space-x-4 ">
              <li>
                <a
                  href="/home"
                  className="block py-2 text-white rounded hover:text-blue-500 "
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 text-white rounded hover:text-blue-500 "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="block py-2 text-white rounded hover:text-blue-500 "
                >
                  Shop page
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="relative block py-2 text-white rounded hover:text-blue-500 text-2xl "
                >
                  <IoMdCart />
                  <span className="absolute top-[2px] -right-2 inline-block w-4 h-4 text-xs text-center text-white bg-blue-500 rounded-full">
                    {data?.getCart.items?.length}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
