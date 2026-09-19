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

app.use((_request, response) => {
  response.status(404).json({ message: "Route not found." });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Internal server error." });
});

export default app;
