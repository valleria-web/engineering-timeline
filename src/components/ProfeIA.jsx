// ProfeIA.jsx
import React, { useState } from "react";
import { askProfe } from "../services/TeacherService";

export default function ProfeIA() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("");

  const go = () => {
    askProfe(input, {
      onSuccess: (data) => {
        console.log("✅ Respuesta Profe IA:", data);
        setResponse(data?.text ?? "(sin texto disponible)");
      },
      onError: (err) => {
        console.error("⚠️ Error en ProfeIA.jsx:", err);
        setResponse(`Error: ${err?.detail ?? "desconocido"}`);
      },
      onStatus: (msg) => {
        console.log("📡 Estado:", msg);
        setStatus(msg);
      }
    });
  };

  return (
    <div>
      <h1>👨‍🏫 Profe IA</h1>
      <input
        type="text"
        placeholder="Escribe tu pregunta..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={go}>Preguntar</button>

      {status && <p><b>Estado:</b> {status}</p>}
      {response && <p><b>Respuesta:</b> {response}</p>}
    </div>
  );
}
