import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function transcribeAudio(audioBlob) {
  const formData = new FormData();

  formData.append(
    "file",
    audioBlob,
    "recording.webm"
  );

  const response = await API.post(
    "/voice/transcribe",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}