import express from "express";
import {
    editPassword,
    editUser,
    handleLogin,
    handleLogout,
    handleNewEditor,
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
    .post("/editor", verifyJWT, verifyRoles(Role.Admin), handleNewEditor)
    .put("/update", verifyJWT, verifyRoles(Role.Admin, Role.Editor, Role.User), editUser)
    .put("/password", verifyJWT, verifyRoles(Role.Admin, Role.Editor, Role.User), editPassword)
    .get("/logout", handleLogout)


export default authRouter;