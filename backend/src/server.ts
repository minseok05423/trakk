import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./services/database.service";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// Start server
async function start() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

start();
