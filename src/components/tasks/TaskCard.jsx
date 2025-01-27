import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskDetailPopup from "./TaskDetailPopup"
import { useCompletedTasks } from "../../context/CompletedTasksContext"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

function TaskCard({ task, onToggle, completed, onCompleteTask }) {
  const [showPopup, setShowPopup] = useState(false)
  const { isTaskCompleted } = useCompletedTasks()
  const { title, description, points, type } = task

  const handleCompleteTask = (taskId) => {
    onCompleteTask(taskId)
    setShowPopup(false)
  }

  if (isTaskCompleted(task.id)) {
    return null
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          layout: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
        }}
        className="bg-white rounded-lg drop-shadow-md p-4 mb-3 flex flex-col gap-2 items-center justify-between"
      >
        <div className="flex flex-row min-w-full">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div>
            <motion.div whileTap={{ scale: 0.9 }} className="w-6 h-6 relative">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => handleCompleteTask(task.id)}
                className="w-6 h-6 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-600 flex items-center justify-center cursor-pointer transition-all duration-200"
              />
              <motion.svg
                className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: completed ? 1 : 0, scale: completed ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  fill="white"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: completed ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>
        <motion.hr
          className="border-gray-300 min-w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex flex-row justify-between min-w-full text-gray-400">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Type: {type === "DAILY" ? "Daily" : "One-time"}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Points: {points}
          </motion.span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPopup(true)}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          View Task
        </motion.button>
      </motion.div>
      {showPopup && (
        <TaskDetailPopup
          task={task}
          onClose={() => setShowPopup(false)}
          show={showPopup}
          onCompleteTask={handleCompleteTask}
        />
      )}
    </AnimatePresence>
  )
}

export default TaskCard

