import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import {
    findUserByUsername,
    updateUserRefreshToken,
    createUser,
    findUserByRefreshToken,
    updateUser
} from "../models/user.model";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../settings";
import Role from "../enums/role";


export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .send("Username and password are required.");
    }

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
        return res.send("There occured an error.").status(500);
    }

    try {

        const existingUsers = await findUserByUsername(username);
        
        if (!existingUsers.length) {
            return res
                .status(401)
                .send("No existing user.");
        }

        const existingUsername = existingUsers[0].username;
        const existingPassword = existingUsers[0].password;
        const existingRole = existingUsers[0].role;

        const userMatch = await bcrypt.compare(password, existingPassword);
        
        if (!userMatch) {
            return res
                .status(401)
                .send("Username or password is wrong.");
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
            .status(200)
            .send({
                "accessToken": accessToken,
                "role": existingRole
            });
        
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

export const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .send("Username and password are required.");
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.toString());

    if (!isEmail) {
        return res
            .status(400)
            .send("The username has to be an email.");
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

export const handleNewEditor = async (req: Request, res: Response) => {
    const { username, password, rePassword } = req.body;

    if (!username || !password || !rePassword) {
        return res
            .status(400)
            .send("Username, password and repeated password are required.");
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.toString());

    if (!isEmail) {
        return res
            .status(400)
            .send("The username has to be an email.");
    }

    if (password !== rePassword) {
        return res
            .status(400)
            .send("The password and the repeated password must be the same.");
    }

    try {
        const duplicateUsers = await findUserByUsername(username);

        if (duplicateUsers.length) {
            return res
                .status(409)
                .send("There already exists a user with this username.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await createUser(username, hashedPassword, Role.Editor);

        return res
            .status(201)
            .send("New editor created.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const editUser = async (req: Request, res: Response) => {
    const { username, password, oldPassword } = req.body;

    if (!username || !password || !oldPassword) {
        return res
            .status(400)
            .send("There have to be a username, password and old password.");
    }

    try {
        const existingUsers = await findUserByUsername(username);
        
        if (!existingUsers.length) {
            return res
                .send("No existing user.")
                .status(401);
        }

        const existingPassword = existingUsers[0].password;

        const userMatch = await bcrypt.compare(oldPassword, existingPassword);
        
        if (!userMatch) {
            return res
                .send("Wrong password.")
                .status(401);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await updateUser(username, hashedPassword);

        return res
            .status(204)
            .send("User updated.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
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
                        "username": existingUsername,
                        "accessToken": accessToken,
                        "role": existingRole
                    })
                    .status(200);
            }
        );
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}