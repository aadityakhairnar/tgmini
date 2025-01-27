import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "./TaskCard"
import ProgressBar from "./ProgressBar"
import { useCompletedTasks } from "../../context/CompletedTasksContext"

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

function TaskList({ tasks, onToggleTask, activeTab, user }) {
  const { isTaskCompleted, completeTask } = useCompletedTasks()

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true
    if (activeTab === "daily") return task.type === "DAILY"
    if (activeTab === "once") return task.type === "ONCE"
    return false
  })

  const handleCompleteTask = (taskId) => {
    completeTask(taskId)
    onToggleTask(taskId)
  }

  const completedTasks = filteredTasks.filter((task) => isTaskCompleted(task.id)).length
  const totalTasks = filteredTasks.length

  return (
    <motion.div
      key={activeTab}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="p-4"
    >
      <ProgressBar completed={completedTasks} total={totalTasks} />
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleCompleteTask}
            completed={isTaskCompleted(task.id)}
            onCompleteTask={handleCompleteTask}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList

