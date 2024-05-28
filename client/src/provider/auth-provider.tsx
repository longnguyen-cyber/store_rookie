import { useMutation } from '@apollo/client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginInput } from '../generated/graphql'
import { LOGIN } from '../graphql/mutations/user'
import { AuthContextType, IUser } from '../utils/types'

const AuthContext = createContext<AuthContextType | null>(null)
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser>()
  const [loginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setUser(data?.login.user)
      localStorage.setItem('user', JSON.stringify(data?.login.user))
      localStorage.setItem('token', data?.login.token)
      navigate('/')
    },
  })

  const login = (data: LoginInput) => {
    loginUser({
      variables: {
        userLoginDto: {
          ...data,
        },
      },
    })
  }
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}
