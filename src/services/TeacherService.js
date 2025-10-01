// TeacherService.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// Envía pregunta al Profe IA
export function askProfe(input, callbacks = {}) {
  socket.emit("askProfe", input);

  // Escucha respuestas del LLM
  socket.on("profeResponse", (data) => {
    if (callbacks?.onSuccess) callbacks.onSuccess(data);
  });

  // Escucha errores
  socket.on("profeError", (err) => {
    console.error("❌ Error desde Profe IA:", err);
    if (callbacks?.onError) callbacks.onError(err);
  });

  // Escucha estados
  socket.on("status", (message) => {
    if (callbacks?.onStatus) callbacks.onStatus(message);
  });
}
