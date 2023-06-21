import { NextFunction, Request, Response } from "express";


const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (origin === "http://localhost:5173") {
        res.header('Access-Control-Allow-Credentials', "true");
    }
    next();
}

export default credentials;