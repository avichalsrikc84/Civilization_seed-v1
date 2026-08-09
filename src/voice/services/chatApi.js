import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function askAthena(message) {
  const response = await API.post("/chat/", {
    message,
  });

  return response.data;
}