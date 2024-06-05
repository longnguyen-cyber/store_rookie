import { useState, useEffect } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="rotate-90  fixed bottom-5 right-5 p-4 text-xl font-bold bg-black text-white rounded-full border-none"
      >
        <MdArrowBackIosNew />
      </button>
    )
  )
}

export default ScrollToTopButton
