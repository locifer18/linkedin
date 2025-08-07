import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";


//congif env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/posts",postRouter);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to App</h1>");
});

//PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`.bgCyan.white);
})