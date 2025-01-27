import React, { createContext, useContext, useState } from "react"

const CompletedTasksContext = createContext()

export const useCompletedTasks = () => {
  const context = useContext(CompletedTasksContext)
  if (!context) {
    throw new Error("useCompletedTasks must be used within a CompletedTasksProvider")
  }
  return context
}

export const CompletedTasksProvider = ({ children }) => {
  const [completedTaskIds, setCompletedTaskIds] = useState([])

  const completeTask = (taskId) => {
    setCompletedTaskIds((prev) => [...prev, taskId])
  }

  const isTaskCompleted = (taskId) => {
    return completedTaskIds.includes(taskId)
  }

  return (
    <CompletedTasksContext.Provider value={{ completedTaskIds, completeTask, isTaskCompleted }}>
      {children}
    </CompletedTasksContext.Provider>
  )
}

