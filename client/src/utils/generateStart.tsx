import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa6'

const generateStar = (star: number) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(star)) {
      stars.push(<FaStar key={i} />)
    } else if (i === Math.floor(star) + 1 && star % 1 >= 0.5) {
      stars.push(<FaStar key={i} />)
    } else if (i === Math.floor(star) + 1 && star % 1 < 0.5 && star % 1 > 0) {
      stars.push(<FaStarHalf key={i} />)
    } else {
      stars.push(<FaRegStar key={i} />)
    }
  }

  return <div className="flex text-yellow-500 items-center">{stars}</div>
}

export default generateStar
