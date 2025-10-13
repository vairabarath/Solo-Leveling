import api from './api'

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  getHistory: async (limit = 20, page = 1) => {
    const response = await api.get('/users/history', {
      params: { limit, page }
    })
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData)
    return response.data
  }
}
