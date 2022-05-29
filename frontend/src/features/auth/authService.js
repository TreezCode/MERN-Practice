import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  // Save userdata in local storage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// -------- TODO --------
// use server and http only cookie to logout user
// ----------------------

// Logout user
const logout = async () => {
  localStorage.removeItem('user')
  await axios.get(API_URL + 'logout')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
