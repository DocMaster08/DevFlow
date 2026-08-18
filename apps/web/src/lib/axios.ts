import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbXN5dWg1ZnowMDAwMjRoYzVqY2Y1b3N5IiwiaWF0IjoxNzg3MDY4NTY1LCJleHAiOjE3ODc2NzMzNjV9.iWVZCWCBkrXhprELK43Ai6pbNsH_0WNBxl5gMtiIVBo"

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});