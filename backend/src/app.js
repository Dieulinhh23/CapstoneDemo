import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_request, response) => {
  response.json({
    name: "CapstoneDemo API",
    message: "The API is running.",
  });
});

app.get("/api/health", (_request, response) => {
  const databaseStates = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
  ];

  const database = databaseStates[mongoose.connection.readyState] ?? "unknown";
  const healthy = database === "connected";

  response.status(healthy ? 200 : 503).json({
    status: healthy ? "ok" : "unavailable",
    database,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/message", (_request, response) => {
  response.json({
    message: "Backend is connected and working!",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/login", (request, response) => {
  const { email, password } = request.body ?? {};
  const isConnected = mongoose.connection.readyState === 1;

  if (!isConnected) {
    return response.status(503).json({
      success: false,
      message: "Database not connected.",
    });
  }

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  if (email === "admin@example.com" && password === "123456") {
    return response.json({
      success: true,
      message: "Login successful.",
      user: { email },
      database: "connected",
    });
  }

  return response.status(401).json({
    success: false,
    message: "Invalid email or password.",
  });
});

app.post("/api/logout", (_request, response) => {
  response.json({
    success: true,
    message: "Logged out successfully.",
  });
});

app.use((_request, response) => {
  response.status(404).json({ message: "Route not found." });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Internal server error." });
});

export default app;
