import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Root route to fix 404 on Railway
app.get("/", (req, res) => {
  res.send("✅ Railway app is running!");
});

// Your existing route (example)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Handle logic here
  console.log("Login request received:", { email, password });

  res.status(200).json({ message: "Login attempt received" });
});

// Use Railway-compatible port
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
