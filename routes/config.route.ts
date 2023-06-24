import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";
import { addConfig, getConfig } from "../controllers/config.controller";


const configRouter = express.Router();

configRouter
    .get("/", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getConfig)
    .post("/create", verifyJWT, verifyRoles(Role.Admin), addConfig)

export default configRouter;