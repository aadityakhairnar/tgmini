import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { createTask, updateTask, deleteTask, updateUser, deleteUser } from "../api/admin"

function AdminDashboard() {
  const { admin } = useAuth()
  const [taskData, setTaskData] = useState({ title: "", description: "", link: "", type: "DAILY", points: 0 })
  const [taskId, setTaskId] = useState("")
  const [userId, setUserId] = useState("")
  const [userData, setUserData] = useState({ username: "", score: 0 })

  const handleCreateTask = async () => {
    try {
      const result = await createTask(taskData)
      console.log("Task created:", result)
      // Reset form
      setTaskData({ title: "", description: "", link: "", type: "DAILY", points: 0 })
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleUpdateTask = async () => {
    try {
      const result = await updateTask(taskId, taskData)
      console.log("Task updated:", result)
      // Reset form
      setTaskId("")
      setTaskData({ title: "", description: "", link: "", type: "DAILY", points: 0 })
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId)
      console.log("Task deleted")
      setTaskId("")
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleUpdateUser = async () => {
    try {
      const result = await updateUser(userId, userData)
      console.log("User updated:", result)
      // Reset form
      setUserId("")
      setUserData({ username: "", score: 0 })
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId)
      console.log("User deleted")
      setUserId("")
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <main className="min-h-screen pt-16 pb-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {admin?.username}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Task Management</h3>
          <input
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Task Link"
            value={taskData.link}
            onChange={(e) => setTaskData({ ...taskData, link: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={taskData.type}
            onChange={(e) => setTaskData({ ...taskData, type: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="DAILY">Daily</option>
            <option value="ONCE">One-time</option>
          </select>
          <input
            type="number"
            placeholder="Task Points"
            value={taskData.points}
            onChange={(e) => setTaskData({ ...taskData, points: Number.parseInt(e.target.value) })}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleCreateTask}
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 mb-2"
          >
            Create Task
          </button>
          <input
            type="text"
            placeholder="Task ID"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleUpdateTask}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-2"
          >
            Update Task
          </button>
          <button
            onClick={handleDeleteTask}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Task
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">User Management</h3>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="User Score"
            value={userData.score}
            onChange={(e) => setUserData({ ...userData, score: Number.parseInt(e.target.value) })}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleUpdateUser}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 mb-2"
          >
            Update User
          </button>
          <button
            onClick={handleDeleteUser}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete User
          </button>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard

