/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { v4 as uuidv4 } from 'uuid'

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  VERIFY_EMAIL,
} from '../graphql/mutations/user'

import { AuthContextType, ISignupInput, IUser } from '../utils/types'
import { toast, ToastContainer } from 'react-toastify'

const AuthContext = createContext<AuthContextType | null>(null)
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser>()
  const [logoutUser] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      console.log('logout', data)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      const oldGuestId = localStorage.getItem('oldGuestId')
      localStorage.setItem('guestId', oldGuestId || '')
      localStorage.removeItem('oldGuestId')

      setUser(undefined)
      navigate('/')
    },
  })
  const [loginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setUser(data?.login.user)
      localStorage.setItem('user', JSON.stringify(data?.login.user))
      localStorage.setItem('token', data?.login.token)
      navigate('/')
    },
  })

  const [verifyEmail] = useMutation(VERIFY_EMAIL)
  const [registerUser] = useMutation(REGISTER, {
    onCompleted: () => {
      navigate('/login')
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

    const guestId = localStorage.getItem('guestId')
    if (!guestId) {
      localStorage.setItem('guestId', uuidv4())
    }
  }, [])

  const logout = () => {
    logoutUser()
  }

  const register = (data: ISignupInput) => {
    registerUser({
      variables: {
        userCreateDto: {
          ...data,
        },
      },
      onCompleted: (data) => {
        if (data.register) {
          toast.success('Register success please check your email to verify')

          return true
        } else {
          return false
        }
      },
    })
  }

  const verification = (token: string) => {
    verifyEmail({
      variables: {
        accessToken: token,
      },
      onCompleted: (data) => {
        if (data.verifyEmail) {
          toast.success('Verify success')
          setTimeout(() => {
            navigate('/login')
          }, 1000)
          return true
        } else {
          toast.error('Verify fail')
          return false
        }
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, register, verification }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}
