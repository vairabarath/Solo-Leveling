import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { QuestProvider } from './context/QuestContext'
import { StatsProvider } from './context/StatsContext'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import AllQuests from './pages/AllQuests'
import QuestDetail from './pages/QuestDetail'
import Stats from './pages/Stats'
import Profile from './pages/Profile'
import Titles from './pages/Titles'

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Layout from './components/Layout/Container'

function App() {
  return (
    <AuthProvider>
      <QuestProvider>
        <StatsProvider>
          <Router>
            <div className="min-h-screen bg-sl-dark">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/quests" element={
                  <ProtectedRoute>
                    <Layout>
                      <AllQuests />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/quests/:id" element={
                  <ProtectedRoute>
                    <Layout>
                      <QuestDetail />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/stats" element={
                  <ProtectedRoute>
                    <Layout>
                      <Stats />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/titles" element={
                  <ProtectedRoute>
                    <Layout>
                      <Titles />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Redirect unknown routes to dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
              
              {/* Toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #2a2a2a',
                  },
                  success: {
                    style: {
                      border: '1px solid #00ff40',
                    },
                  },
                  error: {
                    style: {
                      border: '1px solid #ff0040',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </StatsProvider>
      </QuestProvider>
    </AuthProvider>
  )
}

export default App
