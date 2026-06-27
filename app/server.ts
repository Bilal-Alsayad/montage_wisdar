import app from "./app";
import { env } from "./config/env";

const server = app.listen(env.port, "0.0.0.0", () => {
  console.log(`Render API running on http://0.0.0.0:${env.port}`);
  console.log(`Region: ${env.remotion.region}`);
  console.log(`Function: ${env.remotion.functionName}`);
  console.log(
    `   Auth: ${env.apiKey ? "enabled" : "disabled (no API_KEY set)"}`,
  );
});

// --- Graceful shutdown ---
function shutdown(signal: string) {
  console.log(`\n ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
