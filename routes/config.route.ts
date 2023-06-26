import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";
import { addConfig, deleteConfig, editConfig, getConfig, getConfigData } from "../controllers/config.controller";


const configRouter = express.Router();

configRouter
    .get("/", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getConfig)
    .get("/section", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getConfigData)
    .post("/create", verifyJWT, verifyRoles(Role.Admin), addConfig)
    .delete("/delete/:id", verifyJWT, verifyRoles(Role.Admin), deleteConfig)
    .put("/update", verifyJWT, verifyRoles(Role.Admin), editConfig)

export default configRouter;