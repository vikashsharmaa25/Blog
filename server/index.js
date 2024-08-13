import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connection } from "./configs/database.js";
import router from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import categoryRouter from "./routes/category.route.js";
import path from "path";
const PORT = process.env.PORT || 4001;

const __dirname = path.resolve();
console.log(__dirname);

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
app.use("/api/category", categoryRouter);

// database connection
connection();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running port: ${PORT}`);
});
