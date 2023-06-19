import express, { Request, Response } from "express";
import cors from "cors";
import cookiParser from "cookie-parser";
import tickerRouter from "./routes/ticker.route";
import newspaperRouter from "./routes/newspaper.route";
import authRouter from "./routes/auth.route";

const app = express();
const port = 8800;


app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookiParser());


// routes
app.use("/api/v1/ticker/", tickerRouter);
app.use("/api/v1/newspaper/", newspaperRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});