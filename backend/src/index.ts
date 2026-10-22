import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
