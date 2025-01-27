import React from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen pt-16 pb-20 px-4 max-w-md mx-auto">
      <div className="py-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          <span className="text-4xl text-purple-600">{user.username[0].toUpperCase()}</span>
        </div>
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-600 mb-2">User ID: {user.id}</p>
        <p className="text-gray-600 mb-6">Score: {user.score}</p>
        <div className="w-full space-y-4">
          <button className="w-full py-2 px-4 border border-purple-600 rounded-md text-purple-600 hover:bg-purple-50">
            Edit Profile
          </button>
          <button className="w-full py-2 px-4 border border-purple-600 rounded-md text-purple-600 hover:bg-purple-50">
            View Daily Tasks
          </button>
          <button className="w-full py-2 px-4 border border-purple-600 rounded-md text-purple-600 hover:bg-purple-50">
            View One-time Tasks
          </button>
          <button
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  )
}

export default Profile

