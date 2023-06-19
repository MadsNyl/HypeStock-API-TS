import express from "express";
import {
    handleLogin,
    handleLogout,
    handleNewUser,
    handleRefreshToken
} from "../controllers/auth.controller";
import verifyRoles from "../middleware/verifyRoles.middleware";
import verifyJWT from "../middleware/verifyJWT.middleware";
import Role from "../enums/role";

const authRouter = express.Router();

authRouter
    .get("/", handleRefreshToken)
    .post("/login", handleLogin)
    .post("/register", verifyJWT, verifyRoles(Role.Admin), handleNewUser)
    .get("/logout", handleLogout)


export default authRouter;