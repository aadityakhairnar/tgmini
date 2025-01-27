import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const TelegramAuth = () => {
  const { loginWithTelegram } = useAuth()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?22"
    script.setAttribute("data-telegram-login", process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME)
    script.setAttribute("data-size", "large")
    script.setAttribute("data-onauth", "onTelegramAuth(user)")
    script.setAttribute("data-request-access", "write")
    script.async = true
    document.body.appendChild(script)

    window.onTelegramAuth = (user) => {
      loginWithTelegram(user)
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [loginWithTelegram])

  return (
    <div id="telegram-login-container" className="flex justify-center my-4">
      {/* Telegram Login Button will be rendered here */}
    </div>
  )
}

export default TelegramAuth

