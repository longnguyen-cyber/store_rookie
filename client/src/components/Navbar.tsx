import { useLazyQuery, useQuery } from '@apollo/client'
import _ from 'lodash'
import { IoMdCart } from 'react-icons/io'
import { Link, Outlet } from 'react-router-dom'
import LOGO from '../assets/logo.png'
import { GET_CART } from '../graphql/queries/cart'

import { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { Book } from '../generated/graphql'
import { SEARCH_BOOKS } from '../graphql/queries/book'
import { useAuth } from '../provider/auth-provider'

const Navbar = () => {
  const auth = useAuth()
  const guestId = localStorage.getItem('guestId')
  const user = localStorage.getItem('user')

  const [search, setSearch] = useState('')
  const [dataSearch, setDataSearch] = useState<Book[]>([])

  const [searchByTitle, { data: searchs }] = useLazyQuery(SEARCH_BOOKS, {
    variables: {
      title: search,
    },
  })

  const debouncedSearch = _.debounce((value) => {
    searchByTitle({
      variables: {
        title: value,
      },
      onCompleted(data) {
        setDataSearch(data?.searchByTitle as Book[])
      },
    })
  }, 0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (search) {
      debouncedSearch(search)

      debouncedSearch(search)
    }
  }, [search])

  const { data } = useQuery(GET_CART, {
    variables: {
      id: user ? JSON.parse(user).id : guestId,
    },
    onCompleted(data) {
      if (data.getCart?.guestId) {
        //save old guestId when login success and replace with new guestId of user
        if (data.getCart.userId && data.getCart.guestId !== guestId) {
          localStorage.setItem('oldGuestId', guestId || '')
        }
        localStorage.setItem('guestId', data?.getCart?.guestId)
      } else {
        localStorage.setItem('guestId', uuidv4())
      }
    },
  })

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse justify-center"
            onClick={() => {
              setSearch('')
              setDataSearch([])
            }}
          >
            <img src={LOGO} width={100} alt="Flowbite Logo" />
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
              <li className="relative">
                {dataSearch.length > 0 && (
                  <div className="absolute z-50 max-h-56 h-fit overflow-y-auto rounded border shadow-xl w-[200%] bg-white text-white top-[110%]">
                    {searchs?.searchByTitle?.map((book) => (
                      <Link
                        key={book.id}
                        to={`book/${book.id}`}
                        className="text-gray-900 flex border-b items-center justify-between p-2 space-x-4 hover:bg-gray-800 hover:text-white"
                        onClick={() => {
                          setSearch('')
                          setDataSearch([])
                        }}
                      >
                        <img
                          src={book.images[0]}
                          alt={book.title}
                          className="w-14 h-20 object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-sm font-semibold ">
                            {book.title.trim()}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  data-collapse-toggle="navbar-search"
                  aria-controls="navbar-search"
                  aria-expanded="false"
                  className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => {
                      setTimeout(() => {
                        setDataSearch([])
                        setSearch('')
                      }, 200)
                    }}
                    onFocus={() => {
                      if (search) {
                        setDataSearch([])
                      }
                    }}
                  />
                </div>
              </li>
              <li>
                <a
                  href="/home"
                  className="block py-2 text-white rounded hover:text-blue-500 "
                  onClick={() => {
                    setSearch('')
                    setDataSearch([])
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 text-white rounded hover:text-blue-500 "
                  onClick={() => {
                    setSearch('')
                    setDataSearch([])
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="block py-2 text-white rounded hover:text-blue-500 "
                  onClick={() => {
                    setSearch('')
                    setDataSearch([])
                  }}
                >
                  Shop page
                </a>
              </li>
              <li>
                {auth?.user ? (
                  <span
                    className="relative block py-2 text-white rounded hover:text-blue-500 text-2xl"
                    onClick={() => {
                      setSearch('')
                      setDataSearch([])
                      setOpen(!open)
                    }}
                    title="Profile"
                  >
                    <FaRegUserCircle />
                    {open && (
                      <div className="absolute w-32 top-full border rounded overflow-hidden border-black z-40 text-base">
                        <div className="flex flex-col justify-center bg-white ">
                          <a
                            href="/profile"
                            onClick={() => {
                              setOpen(false)
                            }}
                            className="text-gray-900 p-2 text-left hover:text-white hover:bg-blue-600 border-b"
                          >
                            Profile
                          </a>
                          <button
                            onClick={() => {
                              setOpen(false)
                              auth.logout()
                              toast.success('Logout success')
                            }}
                            className="text-gray-900 p-2 text-left hover:text-white hover:bg-blue-600"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                ) : (
                  <a
                    href="/login"
                    className="block py-2 text-white rounded hover:text-blue-500 "
                    onClick={() => {
                      setSearch('')
                      setDataSearch([])
                    }}
                  >
                    Login
                  </a>
                )}
              </li>
              <li>
                <a
                  href="/cart"
                  className="relative block py-2 text-white rounded hover:text-blue-500 text-2xl "
                  onClick={() => {
                    setSearch('')
                    setDataSearch([])
                  }}
                  title="Cart"
                >
                  <IoMdCart />
                  {data?.getCart &&
                    data?.getCart.items &&
                    data.getCart.items?.length > 0 && (
                      <span className="absolute top-[2px] -right-2 inline-block w-4 h-4 text-xs text-center text-white bg-blue-500 rounded-full">
                        {data?.getCart.items?.length}
                      </span>
                    )}
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
