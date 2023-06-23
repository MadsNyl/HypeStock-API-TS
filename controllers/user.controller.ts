import { Request, Response } from "express"
import { findUserByUsername, updateUserRole, usersByRole } from "../models/user.model";


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

export const getUser = async (req: Request, res: Response) => {
    const { username } = req.query;

    if (!username) {
        return res
            .status(400)
            .send("There has to be an username.");
    }

    try {
         
        const user = await findUserByUsername(username.toString());

        return res
            .status(200)
            .send({
                "user": user
            });

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const editUser = async (req: Request, res: Response) => {
    const { username, role } = req.body;

    if (!username || !role) {
        return res
            .status(400)
            .send("There have to be a username and a role.");
    }

    try {

        await updateUserRole(username.toString(), Number(role));

        return res
            .status(204)
            .send("User role updated.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

