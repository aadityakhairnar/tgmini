import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        if (isTokenExpired(token)) {
          await logout()
        } else {
          setAuthToken(token)
          await fetchUserData()
        }
      } else if (adminToken) {
        if (isTokenExpired(adminToken)) {
          await adminLogout()
        } else {
          setAuthToken(adminToken, true)
          // We don't need to fetch admin data here anymore
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [token, adminToken])

  const setAuthToken = (token, isAdmin = false) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      if (isAdmin) {
        localStorage.setItem("adminToken", token)
      } else {
        localStorage.setItem("token", token)
      }
    } else {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem("token")
      localStorage.removeItem("adminToken")
    }
  }

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token)
      return decoded.exp < Date.now() / 1000
    } catch (error) {
      return true
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://tgminiapp-backend.onrender.com/user/profile")
      setUser(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error)
      await logout()
    }
  }

  const login = async (username) => {
    try {
      const response = await axios.post("https://tgminiapp-backend.onrender.com/auth/login", { username })
      const { token } = response.data
      setToken(token)
      setAuthToken(token)
      await fetchUserData()
      return response.data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (username) => {
    try {
      const response = await axios.post("https://tgminiapp-backend.onrender.com/auth/register", { username })
      const { token } = response.data
      setToken(token)
      setAuthToken(token)
      await fetchUserData()
      return response.data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const adminLogin = async (username, password) => {
    try {
      const response = await axios.post("https://tgminiapp-backend.onrender.com/admin/login", { username, password })
      const { token, admin } = response.data
      setAdminToken(token)
      setAuthToken(token, true)
      setAdmin(admin) // This now directly sets the admin state from the response
      return response.data
    } catch (error) {
      console.error("Admin login error:", error)
      throw error
    }
  }

  const adminRegister = async (username, password) => {
    try {
      const response = await axios.post("https://tgminiapp-backend.onrender.com/admin/register", { username, password })
      const { token, admin } = response.data
      setAdminToken(token)
      setAuthToken(token, true)
      setAdmin(admin)
      return response.data
    } catch (error) {
      console.error("Admin registration error:", error)
      throw error
    }
  }

  const logout = async () => {
    setToken(null)
    setAuthToken(null)
    setUser(null)
  }

  const adminLogout = async () => {
    setAdminToken(null)
    setAuthToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        token,
        adminToken,
        loading,
        login,
        register,
        adminLogin,
        adminRegister,
        logout,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

