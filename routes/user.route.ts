import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";
import {
    editUser,
    getAllUsersByRole, getUser
} from "../controllers/user.controller";


const userRouter = express.Router();


userRouter
    .get("/role", verifyJWT, verifyRoles(Role.Admin), getAllUsersByRole)
    .get("/get", verifyJWT, verifyRoles(Role.Admin), getUser)
    .put("/update", verifyJWT, verifyRoles(Role.Admin), editUser)


export default userRouter;