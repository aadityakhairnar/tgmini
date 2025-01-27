import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const loginWithTelegram = async (telegramUser) => {
    try {
      // For now, we'll just store the Telegram user data
      // In a real app, you'd send this to your backend for verification
      setUser(telegramUser)
      localStorage.setItem("user", JSON.stringify(telegramUser))
      return telegramUser
    } catch (error) {
      console.error("Telegram login error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithTelegram,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

