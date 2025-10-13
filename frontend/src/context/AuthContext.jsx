import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          const response = await authService.getMe()
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: response.data,
              token: state.token
            }
          })
        } catch (error) {
          localStorage.removeItem('token')
          dispatch({ type: 'LOGOUT' })
        }
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.login(email, password)
      
      localStorage.setItem('token', response.data.token)
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: response.data
      })
      
      toast.success('Welcome back, Hunter!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({ type: 'AUTH_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.register(name, email, password)
      
      localStorage.setItem('token', response.data.token)
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: response.data
      })
      
      toast.success('Welcome to the Hunter System!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      dispatch({ type: 'AUTH_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out successfully')
  }

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
