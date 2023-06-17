import express, { Request, Response } from "express";
import cors from "cors";
import tickerRouter from "./routes/ticker.route";
import newspaperRouter from "./routes/newspaper.route";

const app = express();
const port = 8800;


app.use(express.json());
app.use(cors({ origin: "*" }));


// routes
app.use("/api/v1/ticker/", tickerRouter);
app.use("/api/v1/newspaper/", newspaperRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});