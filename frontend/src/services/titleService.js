import api from './api'

export const titleService = {
  getTitles: async () => {
    const response = await api.get('/titles')
    return response.data
  },

  getTitleProgress: async () => {
    const response = await api.get('/titles/progress')
    return response.data
  },

  equipTitle: async (titleId) => {
    const response = await api.post(`/titles/${titleId}/equip`)
    return response.data
  }
}
