import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import {
    findUserByUsername,
    updateUserRefreshToken,
    createUser,
    findUserByRefreshToken
} from "../models/user.model";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../settings";
import Role from "../enums/role";


export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .send("Username and password are required.")
            .status(400);
    }

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
        return res.send("There occured an error.").status(500);
    }

    try {

        const existingUsers = await findUserByUsername(username);
        
        if (!existingUsers.length) {
            return res
                .send("No existing user.")
                .status(401);
        }

        const existingUsername = existingUsers[0].username;
        const existingPassword = existingUsers[0].password;
        const existingRole = existingUsers[0].role;

        const userMatch = await bcrypt.compare(password, existingPassword);
        
        if (!userMatch) {
            return res
                .send("There was not a match for this user.")
                .status(401);
        }

        const accessToken = jsonwebtoken.sign(
            {
                "UserInfo": {
                    "username": existingUsername,
                    "role": existingRole
                }
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jsonwebtoken.sign(
            { "username": existingUsername },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        await updateUserRefreshToken(refreshToken, existingUsername);

        res.cookie(
            "jwt",
            refreshToken,
            {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000 
            }
        );

        return res
            .send({
                "accessToken": accessToken
            })
            .status(200);
        
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

export const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .send("Username and password are required.")
            .status(400);
    }

    try {
        const duplicateUsers = await findUserByUsername(username);

        if (duplicateUsers.length) {
            return res
                .send("There already exists a user with this username.")
                .status(409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await createUser(username, hashedPassword, Role.User);

        return res
            .send("New user created.")
            .status(201);

    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }

}

export const handleLogout = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res
            .send("No cookie content recieved.")
            .status(204);
    }

    const refreshToken = cookies.jwt;

    try {
        const existingUsers = await findUserByRefreshToken(refreshToken);
        
        if (!existingUsers.length) {
            res.clearCookie(
                "jwt",
                {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                }
            );
            return res
                .send("No user found.")
                .status(204);
        }

        await updateUserRefreshToken("", existingUsers[0].username);

        res.clearCookie(
            "jwt",
            {
                httpOnly: true,
                sameSite: "none",
                secure: true
            }
        );

        return res
            .send("User logged out.")
            .status(204);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

export const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res
            .send("No cookie content recieved.")
            .status(204);
    }

    const refreshToken = cookies.jwt;

    if (!REFRESH_TOKEN_SECRET) {
        return res.send("There occured an error.").status(500);
    }

    try {
        const existingUsers = await findUserByRefreshToken(refreshToken);
        
        if (!existingUsers.length) {
            return res
                .send("You do not have access to this endpoint.")
                .status(403);
        }

        const existingUsername = existingUsers[0].username;
        const existingRole = existingUsers[0].role;

        jsonwebtoken.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            (err: jsonwebtoken.VerifyErrors | null, decoded: any) => {
                if (err || existingUsername !== decoded?.username) {
                    return res
                        .send("You do not have access to this endpoint.")
                        .status(403);
                }

                if (!ACCESS_TOKEN_SECRET) {
                    return res.send("There occured an error.").status(500);
                }

                const accessToken = jsonwebtoken.sign(
                    {
                        "UserInfo": {
                            "username": existingUsername,
                            "role": existingRole
                        }
                    },
                    ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );

                return res
                    .send({
                        "accessToken": accessToken 
                    })
                    .status(200);
            }
        );
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}