import { NextFunction, Request, Response } from "express";
import allowedOrigins from "../allowedOrigins";

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {

    }

    if (origin === "http://localhost:5173") {
        res.header('Access-Control-Allow-Credentials', "true");
        res.header('Access-Control-Allow-Methods', ["GET", "POST", "DELETE", "PUT", "OPTIONS"]);
        res.header('Access-Control-Allow-Headers', ["Origin", "Content-Type", "Accept", "Authorization"]);
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
}

export default credentials;