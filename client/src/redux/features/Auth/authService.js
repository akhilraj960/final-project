import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Register
const register = async (userData) => {
  try {
    const response = await instance.post("/register", userData);
    return response;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

// Login
const login = async (userData) => {
  try {
    const response = await instance.post("/login", userData);

    // Update the token in the Axios instance headers
    const newToken = response.data.token;
    instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    return response;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

// GetStatus
const getStatus = async () => {
  try {
    const response = await instance.get("/getstatus");
    return response;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

// profile

const profile = async () => {
  try {
    const response = await instance.get("/profile");
    return response;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

// Logout
const logout = async () => {
  try {
    // Clear the token in the Axios instance headers
    delete instance.defaults.headers.common["Authorization"];

    const response = await instance.get("/logout");
    return response;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const handleErrorResponse = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return { status: error.response.status, message: error.response.data };
  } else if (error.request) {
    // The request was made but no response was received
    return { status: 500, message: "No response received from the server" };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { status: 500, message: error.message };
  }
};

const authService = {
  register,
  login,
  getStatus,
  profile,
  logout,
};

export default authService;
