import express from "express";
import { addNewspaper, getAllNewspapers, getNewspaper, removeNewspaper } from "../controllers/newspaper.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";


const newspaperRouter = express.Router();


newspaperRouter
    .get("/", getAllNewspapers)
    .get("/get", getNewspaper)
    .post("/create", verifyJWT, verifyRoles(Role.Admin, Role.Editor), addNewspaper)
    .delete("/delete", verifyJWT, verifyRoles(Role.Admin, Role.Editor), removeNewspaper)
    .put("/update", verifyJWT, verifyRoles(Role.Admin, Role.Editor), removeNewspaper)


export default newspaperRouter;