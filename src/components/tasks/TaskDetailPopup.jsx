import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

const TaskDetailPopup = ({ task, onClose, show, onCompleteTask }) => {
  if (!task || !show) return null

  const handleCompleteTask = () => {
    onCompleteTask(task.id)
    onClose()
    // API call in the background
    axios
      .post(`https://tgminiapp-backend.onrender.com/user/complete-task/${task.id}`)
      .catch((error) => console.error("Failed to complete task:", error))
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-md w-full m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
          <p className="text-gray-600 mb-4">{task.description}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Type: {task.type === "DAILY" ? "Daily" : "One-time"}</span>
            <span>Points: {task.points}</span>
          </div>
          <button
            onClick={handleCompleteTask}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 mb-2"
          >
            Complete Task
          </button>
          <button
            onClick={onClose}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-200"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TaskDetailPopup

