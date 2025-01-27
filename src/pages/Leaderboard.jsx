import React, { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("https://tgminiapp-backend.onrender.com/user/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setLeaderboardData(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch leaderboard data")
        setLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [token])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  }

  const { currentUser, leaderboard } = leaderboardData

  const getBackgroundColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-400"
      case 2:
        return "bg-gray-300"
      case 3:
        return "bg-orange-400"
      default:
        return "bg-white"
    }
  }

  const getEmoji = (rank) => {
    switch (rank) {
      case 1:
        return "👑"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return ""
    }
  }

  return (
    <main className="min-h-screen pt-16 pb-32 min-w-screen mx-auto text-black">
      <div className="bg-gradient-to-r from-[#C241FF] to-[#5B32FF] min-w-full flex flex-col justify-center items-center py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <span className="text-xl font-semibold">{leaderboard[0].username[0].toUpperCase()}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mt-6 text-white"
        >
          <span className="text-2xl font-bold">{leaderboard[0].username}</span>
          <span className="text-xl">Rank: 1</span>
          <span className="text-xl">Score: {leaderboard[0].score}</span>
        </motion.div>
      </div>

      <div className="space-y-4 p-4 mb-24">
        <AnimatePresence>
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${getBackgroundColor(user.rank)}`}
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold w-6">{user.rank}</span>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold">{user.username[0].toUpperCase()}</span>
                </div>
                <span className="font-medium">{user.username}</span>
                <span className="text-2xl">{getEmoji(user.rank)}</span>
              </div>
              <span className="text-purple-600 font-semibold">{user.score}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-16 left-0 right-0 bg-white shadow-lg rounded-t-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-bold w-6">{currentUser.rank}</span>
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-xl font-semibold">{currentUser.username[0].toUpperCase()}</span>
            </div>
            <span className="font-medium">{currentUser.username}</span>
          </div>
          <span className="text-purple-600 font-semibold">{currentUser.score}</span>
        </div>
      </motion.div>
    </main>
  )
}

export default Leaderboard

