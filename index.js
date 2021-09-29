import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth-routes.js";
import usersRouter from "./routes/users-routes.js";
// import { Sequelize } from "sequelize";
// import { User } from "./models/Users.js";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public")));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
