import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import TelegramAuth from "../components/TelegramAuth"

function Login() {
  const navigate = useNavigate()
  const { loginWithTelegram } = useAuth()

  const handleTelegramLogin = async (telegramUser) => {
    try {
      await loginWithTelegram(telegramUser)
      navigate("/profile")
    } catch (error) {
      console.error("Login failed:", error)
      // Handle login error (e.g., show error message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in with Telegram</h2>
        </div>
        <TelegramAuth />
        <div className="text-center">
          <Link to="/admin-login" className="font-medium text-gray-600 hover:text-gray-500">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

