import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

//access dotenv
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend running" });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

export default app;
//health check endpoint added to backend/api/index.ts to verify server status and respond with a 200 OK status and JSON message.