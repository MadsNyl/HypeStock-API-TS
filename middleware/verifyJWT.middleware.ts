import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../settings";
import { Response, NextFunction } from "express";
import { UserRequest } from "../types/request";


const verifyJWT = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res
            .status(401)
            .send("The auth header need to start with Bearer.");
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
                    .status(403)
                    .send("You do not have access to this endpoint.");
            }

            req.username = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role;
            next();
        }
    )
}


export default verifyJWT;