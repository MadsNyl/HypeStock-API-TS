import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../settings";
import { Response, NextFunction } from "express";
import { UserRequest } from "../types/request";


const verifyJWT = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.username || !req.role) {
        return res
            .send("Request need both username and role.")
            .status(401);
    }

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res
            .send("The auth header need to start with Bearer.")
            .status(401);
    }

    const token = authHeader.split(" ")[1];

    if (!ACCESS_TOKEN_SECRET) {
        return res.send("There occured an error.").status(500);
    }

    jsonwebtoken.verify(
        token,
        ACCESS_TOKEN_SECRET,
        (err: jsonwebtoken.VerifyErrors | null, decoded: any) => {
            if (err) {
                return res
                    .send("You do not have access to this endpoint.")
                    .status(403);
            }

            req.username = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role;
            next();
        }
    )
}


export default verifyJWT;