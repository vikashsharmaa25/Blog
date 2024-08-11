import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connection } from "./configs/database.js";
import router from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOption = {
  origin: "http://localhost:5173",
  credential: true,
};
app.use(cors(corsOption));
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// database connection
connection();

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`server is running port: ${PORT}`);
});
