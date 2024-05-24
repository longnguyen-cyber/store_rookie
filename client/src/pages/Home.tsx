import { useQuery } from '@apollo/client'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Navbar from '../components/Navbar'
import {
  GET_BOOK_ONSALE,
  GET_BOOKS_POPULAR,
  GET_BOOKS_RECOMMENED,
} from '../graphql/queries/book'
import generateStar from '../utils/generateStart'
import { useState } from 'react'
import { Book } from '../generated/graphql'
import Footer from '../components/Footer'
const Home = () => {
  const { data: booksSale } = useQuery(GET_BOOK_ONSALE)
  const { data: booksRecommend } = useQuery(GET_BOOKS_RECOMMENED)
  const { data: booksPopular } = useQuery(GET_BOOKS_POPULAR)
  const [isRecommend, setIsRecommend] = useState(true)

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
                <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
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
                <span className=" font-bold text-gray-900 dark:text-white">
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
      <div className="px-56">
        <div className="flex justify-between">
          <h1>On sale</h1>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            View all
          </button>
        </div>
        <>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {booksSale?.promotionsOnSale.map((promotion, index) => {
              const { book } = promotion
              let description = book.description!
              if (description.length > 100) {
                description = description.substring(0, 100)
              } else {
                description = description.padEnd(100, '')
              }
              console.log(description.length)
              return (
                <SwiperSlide key={index}>
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img
                        className="p-8 rounded-t-lg"
                        src={book.images[0]}
                        alt="product image"
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {book.title}
                        </p>
                        <small className="text-white">{description}</small>
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
                        <span className=" font-bold text-gray-900 dark:text-white">
                          ${book.prices && book.prices[0].discountPrice}{' '}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </>
        <div className="flex justify-center space-x-3 mt-20">
          <button
            onClick={() => setIsRecommend(true)}
            className={`${
              isRecommend
                ? 'bg-blue-700 text-white'
                : 'bg-white text-black dark:bg-gray-800 dark:text-white'
            } px-5 py-2.5 rounded-lg`}
          >
            Recommend
          </button>
          <button
            onClick={() => setIsRecommend(false)}
            className={`${
              !isRecommend
                ? 'bg-blue-700 text-white'
                : 'bg-white text-black dark:bg-gray-800 dark:text-white'
            } px-5 py-2.5 rounded-lg`}
          >
            Popular
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {renderCard(
            isRecommend
              ? (booksRecommend?.recommendBooks as Book[])
              : (booksPopular?.popularBooks as Book[])
          )}
        </div>
        <br />
      </div>
      <Footer />
    </div>
  )
}

export default Home