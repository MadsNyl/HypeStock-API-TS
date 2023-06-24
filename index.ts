import express, { Request, Response } from "express";
import cors from "cors";
import cookiParser from "cookie-parser";
import tickerRouter from "./routes/ticker.route";
import newspaperRouter from "./routes/newspaper.route";
import authRouter from "./routes/auth.route";
import articleWordsRouter from "./routes/articleWords.route";
import credentials from "./middleware/credentials";
import articleRouter from "./routes/article.route";
import userRouter from "./routes/user.route";
import configRouter from "./routes/config.route";
import fileUpload from "express-fileupload";

const app = express();
const port = 8800;

app.use(credentials);
app.use(express.json());
app.use(fileUpload());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookiParser());


// routes
app.use("/api/v1/ticker/", tickerRouter);
app.use("/api/v1/newspaper/", newspaperRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/homograph/", articleWordsRouter);
app.use("/api/v1/article/", articleRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/config/", configRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});