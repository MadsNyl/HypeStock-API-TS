import express from "express";
import cors from "cors";
import cookiParser from "cookie-parser";
import corsOptions from "./corsOptions";
import tickerRouter from "./routes/ticker.route";
import newspaperRouter from "./routes/newspaper.route";
import authRouter from "./routes/auth.route";
import articleWordsRouter from "./routes/articleWords.route";
import credentials from "./middleware/credentials";
import articleRouter from "./routes/article.route";
import userRouter from "./routes/user.route";
import configRouter from "./routes/config.route";
import fileUpload from "express-fileupload";
import filingRouter from "./routes/filing.route";
import statementRouter from "./routes/statement.route";
import subredditRouter from "./routes/reddit/subreddit.reddit.route";
import redditRouter from "./routes/reddit/reddit.route";

const app = express();
const port = 8800;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use(cookiParser());


// routes
app.use("/api/v1/ticker/", tickerRouter);
app.use("/api/v1/newspaper/", newspaperRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/homograph/", articleWordsRouter);
app.use("/api/v1/article/", articleRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/config/", configRouter);
app.use("/api/v1/filing/", filingRouter);
app.use("/api/v1/statement", statementRouter);
app.use("/api/v1/reddit", redditRouter);
app.use("/api/v1/reddit/subreddit", subredditRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});