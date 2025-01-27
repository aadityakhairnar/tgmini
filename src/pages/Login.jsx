import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    try {
      if (telegram.initDataUnsafe && telegram.initDataUnsafe.user) {
        const telegramUsername = telegram.initDataUnsafe.user.username;
        setUsername(telegramUsername);
        handleSubmit();
      } else {
        setError("No Telegram user data found");
      }
    } catch (err) {
      setError("Failed to get Telegram data");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (username) => {
    try {
      await login(username);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show error message)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show error message)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        Error : {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Don't have an account? Register
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/admin-login"
            className="font-medium text-gray-600 hover:text-gray-500"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
