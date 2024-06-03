import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import { useAuth } from '../provider/auth-provider'

export default function Verification() {
  const auth = useAuth()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      auth?.verification(token)
    }
  }, [token])

  return (
    <div>
      <Loading />
    </div>
  )
}
