import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Lazy initialized Gemini client to prevent crashes if the key is missing on startup
  let aiClient: GoogleGenAI | null = null;

  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy" });
  });

  // Secure API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;

      if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
      }

      // Lazy-get client
      const ai = getGeminiClient();

      // Query Gemini 3.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are SOLACE's Digital Mentor and AI Safety guide, specializing in cybersecurity, privacy, civic security, and digital safety in Luxembourg.",
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error communicating with Gemini API on backend:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred while communicating with the AI model." 
      });
    }
  });

  // Vite middleware integration for asset serving & SPA routing
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational in ${process.env.NODE_ENV || 'development'} mode!`);
    console.log(`Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
