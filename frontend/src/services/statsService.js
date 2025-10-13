import api from './api'

export const statsService = {
  getCurrentStats: async () => {
    const response = await api.get('/stats/current')
    return response.data
  },

  getStatsHistory: async (days = 7) => {
    const response = await api.get('/stats/history', {
      params: { days }
    })
    return response.data
  },

  getStatsBreakdown: async () => {
    const response = await api.get('/stats/breakdown')
    return response.data
  }
}
