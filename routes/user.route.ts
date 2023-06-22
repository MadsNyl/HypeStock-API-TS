import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";
import {
    getAllUsersByRole
} from "../controllers/user.controller";


const userRouter = express.Router();


userRouter
    .get("/role", verifyJWT, verifyRoles(Role.Admin), getAllUsersByRole)


export default userRouter;