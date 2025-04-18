import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import { connectDBAndStartServer } from "./config/db";
import cookieParser from "cookie-parser";
import { APP_ORIGIN } from "./constants/env";
import { errorHandler } from "./middleware/errorHandler";
// import { catchErrors } from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import authenticate, { authorize } from "./middleware/authenticate";
import sessionROutes from "./routes/session.routes";
import adminRoutes from './routes/admin.routes'
import uploadRoutes from './routes/upload.route'
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    credentials: true,
    origin: APP_ORIGIN,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const date = new Date(Date.now())
  const ex = {
    url: req.url,
    method: req.method,
    date:date.toString()
  };
  console.table(ex);
 
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/sessions", authenticate, sessionROutes);
app.use("/admin", authenticate, adminRoutes);
app.use('/api', uploadRoutes)

app.use(errorHandler);

connectDBAndStartServer();

export default app;
