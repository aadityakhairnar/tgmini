import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Header from "./components/layout/Header"
import BottomNav from "./components/layout/BottomNav"
import Tasks from "./pages/Tasks"
import Leaderboard from "./pages/Leaderboard"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import AdminLogin from "./pages/AdminLogin"
import AdminRegister from "./pages/AdminRegister"
import Register from "./pages/Register"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

const AdminRoute = ({ children }) => {
  const { admin, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!admin) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}

function AppContent() {
  const { user, admin, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              admin ? (
                <Navigate to="/admin" replace />
              ) : (
                <ProtectedRoute>
                  <Navigate to="/tasks" replace />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
        {user && <div className="h-16"></div>}
        {user && <BottomNav />}
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

