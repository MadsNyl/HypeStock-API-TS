import { Request, Response } from "express"
import { usersByRole } from "../models/user.model";


export const getAllUsersByRole = async (req: Request, res: Response) => {
    const { role } = req.query;

    if (!role) {
        return res
            .status(400)
            .send("There has to be a role.");
    }

    try {
        const users = await usersByRole(Number(role));

        if (!users.length) {
            return res
                .status(404)
                .send("There are no editors yet.");
        }

        return res
            .status(200)
            .send({
                "users": users
            });

    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

