import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    
    try {
      telegram.expand(); // Expands the web app UI inside Telegram

      if (telegram.initDataUnsafe && telegram.initDataUnsafe.user) {
        const telegramUsername = telegram.initDataUnsafe.user.username || `tg_${telegram.initDataUnsafe.user.id}`;

        handleAuth(telegramUsername);
      } else {
        setError("No Telegram user data found");
      }
    } catch (err) {
      setError("Failed to get Telegram data");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuth = async (username) => {
    try {
      await login(username);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed, trying registration...");
      try {
        await register(username);
        navigate("/profile");
      } catch (registerError) {
        console.error("Registration failed:", registerError);
        setError("Authentication failed.");
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}

export default Login;
