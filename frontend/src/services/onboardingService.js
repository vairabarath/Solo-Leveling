import api from './api'

export const onboardingService = {
  completeOnboarding: async (assessmentData) => {
    const response = await api.post('/onboarding/complete', {
      assessmentData
    })
    return response.data
  }
}
