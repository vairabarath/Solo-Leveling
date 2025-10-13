import api from './api'

export const questService = {
  getDailyQuests: async () => {
    const response = await api.get('/quests/daily')
    return response.data
  },

  getAvailableQuests: async (category = null) => {
    const params = category ? { category } : {}
    const response = await api.get('/quests/available', { params })
    return response.data
  },

  getQuestById: async (id) => {
    const response = await api.get(`/quests/${id}`)
    return response.data
  },

  completeQuest: async (id) => {
    const response = await api.post(`/quests/${id}/complete`, {
      confirmed: true
    })
    return response.data
  }
}
