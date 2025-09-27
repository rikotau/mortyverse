import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_MORTY_API),
  timeout: 10000,
});
