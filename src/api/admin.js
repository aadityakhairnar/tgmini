import axios from "axios"

const BASE_URL = "https://tgminiapp-backend.onrender.com"

export const adminLogin = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/admin/login`, { username, password })
  return response.data
}

export const createTask = async (taskData) => {
  const response = await axios.post(`${BASE_URL}/tasks`, taskData)
  return response.data
}

export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, taskData)
  return response.data
}

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`)
  return response.data
}

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${BASE_URL}/user/update/${userId}`, userData)
  return response.data
}

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/user/delete/${userId}`)
  return response.data
}

