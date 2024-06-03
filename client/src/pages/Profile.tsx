import { useNavigate } from 'react-router-dom'
import { useAuth } from '../provider/auth-provider'
import { useEffect } from 'react'

const Profile = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  console.log(auth?.user?.id)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!auth?.user) {
        navigate('/login')
      }
    }, 3000) // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer)
  }, [auth, navigate])

  return (
    <div className="px-56 py-10">
      Your profile
      <div>
        <div>Username: {auth?.user?.username}</div>
        <div>Email: {auth?.user?.email}</div>
      </div>
    </div>
  )
}

export default Profile
