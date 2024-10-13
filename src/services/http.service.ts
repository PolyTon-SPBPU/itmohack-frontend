import axios from "axios";

export const httpService = (token?: string) => {
  const instance = axios.create({
    baseURL: "https://polytones.online/api/",
    headers: {
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      'Content-Type': 'application/json'
    }
  })

  return instance
}