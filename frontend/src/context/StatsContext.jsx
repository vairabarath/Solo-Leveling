import { createContext, useContext, useReducer, useEffect } from 'react'
import { statsService } from '../services/statsService'
import toast from 'react-hot-toast'

const StatsContext = createContext()

const initialState = {
  currentStats: null,
  statsHistory: [],
  statsBreakdown: null,
  loading: false,
  error: null
}

const statsReducer = (state, action) => {
  switch (action.type) {
    case 'STATS_START':
      return { ...state, loading: true, error: null }
    case 'STATS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null
      }
    case 'STATS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'SET_CURRENT_STATS':
      return {
        ...state,
        currentStats: action.payload,
        loading: false
      }
    case 'SET_STATS_HISTORY':
      return {
        ...state,
        statsHistory: action.payload,
        loading: false
      }
    case 'SET_STATS_BREAKDOWN':
      return {
        ...state,
        statsBreakdown: action.payload,
        loading: false
      }
    case 'UPDATE_STATS':
      return {
        ...state,
        currentStats: { ...state.currentStats, ...action.payload }
      }
    default:
      return state
  }
}

export const StatsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statsReducer, initialState)

  const getCurrentStats = async () => {
    try {
      dispatch({ type: 'STATS_START' })
      const response = await statsService.getCurrentStats()
      dispatch({ type: 'SET_CURRENT_STATS', payload: response.data })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load stats'
      dispatch({ type: 'STATS_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const getStatsHistory = async (days = 7) => {
    try {
      dispatch({ type: 'STATS_START' })
      const response = await statsService.getStatsHistory(days)
      dispatch({ type: 'SET_STATS_HISTORY', payload: response.data.history })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load stats history'
      dispatch({ type: 'STATS_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const getStatsBreakdown = async () => {
    try {
      dispatch({ type: 'STATS_START' })
      const response = await statsService.getStatsBreakdown()
      dispatch({ type: 'SET_STATS_BREAKDOWN', payload: response.data })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load stats breakdown'
      dispatch({ type: 'STATS_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const updateStats = (newStats) => {
    dispatch({ type: 'UPDATE_STATS', payload: newStats })
  }

  const value = {
    ...state,
    getCurrentStats,
    getStatsHistory,
    getStatsBreakdown,
    updateStats
  }

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStats = () => {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}
