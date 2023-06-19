import { NextFunction, Response } from "express"
import { UserRequest } from "../types/request"


const verifyRoles = (...allowedRoles: number[]) => {
    return (req: UserRequest, res: Response, next: NextFunction) => {
        if (!req?.role) {
            return res
                .send("There need to be a role in the request.")
                .status(401);
        }

        const roles = [...allowedRoles];
        const result = roles.includes(req.role);

        if (!result) {
            return res
                .send("You have not the role required for this endpoint.")
                .status(401);
        }

        next();
    }
}

export default verifyRoles;