import express, { Request, Response, NextFunction } from "express";
import webHookRoutes from "@routes/webhook.routes";

const app = express();

app.use(express.json());

app.use("/", webHookRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
