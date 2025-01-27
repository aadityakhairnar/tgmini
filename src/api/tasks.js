import axios from "axios"

const BASE_URL = "https://tgminiapp-backend.onrender.com"

export const fetchAllTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`)
  return response.data
}

export const fetchDailyTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/daily`)
  return response.data
}

export const fetchOnceTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/once`)
  return response.data
}

export const completeTask = async (taskId) => {
  const response = await axios.post(`${BASE_URL}/user/complete-task/${taskId}`)
  return response.data
}

