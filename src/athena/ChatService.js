import { askAthena } from "../voice/services/chatApi";

export async function chat(message) {
  const result = await askAthena(message);

  return result.response;
}