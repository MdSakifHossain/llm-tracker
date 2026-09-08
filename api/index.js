import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { connectMongo } from "./db.js";
import modelRoutes from "./routes/models.js";

// ── App ─────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT ?? 3000;

// ── Middleware ──────────────────────────────────────────────────

app.use(express.json());
app.use(cors());

// ── Routes ──────────────────────────────────────────────────────

app.use("/api/models", modelRoutes);

// ── Start ───────────────────────────────────────────────────────

async function start() {
    await connectMongo();

    app.listen(PORT, () => {
        console.log(`🚀 Server running → http://localhost:${PORT}`);
    });
}

start();
