// 1. Dependencies and Environment
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
// Si usas Node < 18, descomenta esto:
// import fetch from 'node-fetch';

// 2. OpenAI Setup
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

// --- Helper Functions ---
function mapPrinciple(principleId) {
  const principles = {
    1: "Máquina de vapor y Revolución Industrial",
    2: "Electricidad y electromagnetismo",
    3: "La era digital y el software",
  };
  return principles[principleId] || "Principio de Ingeniería Desconocido";
}

function generateSystemPrompt(principleName, ageAvg, mode) {
  let instruction = `Eres un profesor de ingeniería llamado Profe IA. Tu objetivo es educar e inspirar a un equipo de estudiantes de ${ageAvg} años sobre el principio de ingeniería "${principleName}".`;

  switch (mode) {
    case 'explain':
      instruction += ` Explica el principio en un tono súper amigable y conciso, usando una analogía simple. Tu respuesta DEBE ser solo el texto explicativo.`;
      break;
    case 'build':
      instruction += ` Describe una actividad simple y práctica que el equipo puede construir con materiales comunes. La respuesta DEBE tener 'text' como introducción y 'bullets' con 3-5 pasos numerados.`;
      break;
    case 'help':
      instruction += ` Responde a su pregunta con una ayuda clara, pero sin dar la solución completa.`;
      break;
    case 'present':
      instruction += ` Genera tres puntos clave y una 'checkQuestion' (pregunta de verificación).`;
      break;
    case 'wrap':
      instruction += ` Ofrece una frase de cierre motivacional.`;
      break;
    case 'welcome':
    default:
      instruction += ` Ofrece una bienvenida inspiradora.`;
      break;
  }
  return instruction;
}

// 3. Server Setup (Express & Socket.IO)
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

app.use(express.json());

app.post("/api/profe/ask", (req, res) => {
  res.status(501).json({ error: "server_error", detail: "Use Socket.IO" });
});

// 4. Socket.IO Handler
io.on('connection', (socket) => {
  console.log(`✅ Cliente conectado: ${socket.id}`);

  socket.on('askProfe', async (input) => {
    console.log(`📩 Solicitud recibida:`, input);

    if (!OPENAI_API_KEY) {
      const errorMessage = "Falta OPENAI_API_KEY en .env";
      socket.emit('profeError', { error: "config_error", detail: errorMessage });
      socket.emit('status', 'Error de configuración de la API.');
      return;
    }

    try {
      socket.emit('status', 'Consultando a la inteligencia artificial...');

      const principleName = mapPrinciple(input.principleId);
      const systemPrompt = generateSystemPrompt(principleName, input.ageAvg, input.mode);
      const userQuery = input.userQuestion || principleName;

      const payload = {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuery }
        ]
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage = errorBody.error?.message || `Error ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      const textResponse = result.choices?.[0]?.message?.content;

      if (!textResponse) throw new Error("Respuesta vacía del LLM.");

      // Construcción de output consistente
      let output = { text: textResponse, bullets: [], checkQuestion: "" };

      if (input.mode === 'build' || input.mode === 'present') {
        const lines = textResponse.split('\n').filter(line => line.trim() !== '');
        if (lines.length > 1) {
          output.text = lines[0];
          output.bullets = lines.slice(1).map(line => line.replace(/^[-*]?\s*\d*\.\s*/, '').trim());
          if (input.mode === 'present') {
            const last = output.bullets[output.bullets.length - 1];
            if (last?.toLowerCase().includes('pregunta')) {
              output.checkQuestion = last.replace(/pregunta:/i, '').trim();
              output.bullets.pop();
            }
          }
        }
      }

      socket.emit('profeResponse', output);
      socket.emit('status', '✅ Respuesta recibida.');

    } catch (error) {
      console.error(`❌ Error con ${socket.id}:`, error.message);
      socket.emit('profeError', {
        error: "server_error",
        detail: error.message || "Error desconocido en el servidor."
      });
      socket.emit('status', 'Error al procesar la solicitud.');
    }
  });

  socket.on('disconnect', () => {
    console.log(`👋 Cliente desconectado: ${socket.id}`);
  });
});

// 5. Start server
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Profe IA server corriendo en http://localhost:${PORT}`);
});
