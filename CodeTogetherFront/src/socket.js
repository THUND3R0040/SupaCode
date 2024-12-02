import { io } from "socket.io-client";

const URL = process.env.VITE_API_URI;
export const socket = io(URL, {
  reconnectionDelay: 5000,
});
