import axios from "axios";

const api = axios.create({
  baseURL: "https://codeguardian-ai-ye72.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;