import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskTabs from "../components/tasks/TaskTabs"
import TaskList from "../components/tasks/TaskList"
import { fetchAllTasks, fetchDailyTasks, fetchOnceTasks, completeTask } from "../api/tasks"
import { useAuth } from "../context/AuthContext"
import { CompletedTasksProvider } from "../context/CompletedTasksContext"

function Tasks() {
  const [activeTab, setActiveTab] = useState("all")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, setUser } = useAuth()

  useEffect(() => {
    fetchTasks()
  }, []) // Removed activeTab dependency

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      let fetchedTasks
      switch (activeTab) {
        case "daily":
          fetchedTasks = await fetchDailyTasks()
          break
        case "once":
          fetchedTasks = await fetchOnceTasks()
          break
        default:
          fetchedTasks = await fetchAllTasks()
      }
      setTasks(fetchedTasks)
    } catch (err) {
      setError("Failed to fetch tasks")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = async (taskId) => {
    try {
      const updatedUser = await completeTask(taskId)
      setUser(updatedUser)
      // We don't immediately remove the task from the list anymore
      // The animation will handle the visual removal
    } catch (err) {
      console.error("Failed to complete task:", err)
      // You might want to show an error message to the user here
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 pb-20 max-w-md mx-auto"
    >
      <h1 className="text-purple-800 font-bold text-3xl pl-4 bg-white">Tasks</h1>
      <div className="pt-4 bg-white">
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <CompletedTasksProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <p>Loading tasks...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <p className="text-red-500">{error}</p>
            </motion.div>
          ) : (
            <TaskList key={activeTab} tasks={tasks} onToggleTask={toggleTask} activeTab={activeTab} user={user} />
          )}
        </AnimatePresence>
      </CompletedTasksProvider>
    </motion.main>
  )
}

export default Tasks

