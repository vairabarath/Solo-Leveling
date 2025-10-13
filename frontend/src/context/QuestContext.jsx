import { createContext, useContext, useReducer, useEffect } from 'react'
import { questService } from '../services/questService'
import toast from 'react-hot-toast'

const QuestContext = createContext()

const initialState = {
  dailyQuests: [],
  availableQuests: [],
  currentQuest: null,
  loading: false,
  error: null
}

const questReducer = (state, action) => {
  switch (action.type) {
    case 'QUEST_START':
      return { ...state, loading: true, error: null }
    case 'QUEST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null
      }
    case 'QUEST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'SET_DAILY_QUESTS':
      return {
        ...state,
        dailyQuests: action.payload,
        loading: false
      }
    case 'SET_AVAILABLE_QUESTS':
      return {
        ...state,
        availableQuests: action.payload,
        loading: false
      }
    case 'SET_CURRENT_QUEST':
      return {
        ...state,
        currentQuest: action.payload
      }
    case 'UPDATE_QUEST_STATUS':
      return {
        ...state,
        dailyQuests: state.dailyQuests.map(quest =>
          quest.questId === action.payload.questId
            ? { ...quest, isCompleted: true, completedAt: new Date() }
            : quest
        )
      }
    default:
      return state
  }
}

export const QuestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questReducer, initialState)

  const getDailyQuests = async () => {
    try {
      dispatch({ type: 'QUEST_START' })
      const response = await questService.getDailyQuests()
      dispatch({ type: 'SET_DAILY_QUESTS', payload: response.data.quests })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load daily quests'
      dispatch({ type: 'QUEST_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const getAvailableQuests = async (category = null) => {
    try {
      dispatch({ type: 'QUEST_START' })
      const response = await questService.getAvailableQuests(category)
      dispatch({ type: 'SET_AVAILABLE_QUESTS', payload: response.data.quests })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load available quests'
      dispatch({ type: 'QUEST_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const getQuestById = async (id) => {
    try {
      dispatch({ type: 'QUEST_START' })
      const response = await questService.getQuestById(id)
      dispatch({ type: 'SET_CURRENT_QUEST', payload: response.data })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load quest'
      dispatch({ type: 'QUEST_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const completeQuest = async (questId) => {
    try {
      dispatch({ type: 'QUEST_START' })
      const response = await questService.completeQuest(questId)
      
      // Update quest status in daily quests
      dispatch({ type: 'UPDATE_QUEST_STATUS', payload: { questId } })
      
      // Show success message
      if (response.data.levelUp) {
        toast.success(`LEVEL UP! You are now level ${response.data.newLevel}!`, {
          duration: 6000,
          style: {
            background: '#ffd700',
            color: '#000',
            border: '2px solid #ff6b35'
          }
        })
      } else {
        toast.success(response.data.message, { duration: 4000 })
      }
      
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to complete quest'
      dispatch({ type: 'QUEST_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const value = {
    ...state,
    getDailyQuests,
    getAvailableQuests,
    getQuestById,
    completeQuest
  }

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  )
}

export const useQuests = () => {
  const context = useContext(QuestContext)
  if (!context) {
    throw new Error('useQuests must be used within a QuestProvider')
  }
  return context
}
