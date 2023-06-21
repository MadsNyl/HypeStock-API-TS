import express from "express";
import { addNewspaper, editNewspaper, getAllNewspapers, getNewspaper, removeNewspaper } from "../controllers/newspaper.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";


const newspaperRouter = express.Router();


newspaperRouter
    .get("/", getAllNewspapers)
    .get("/get", getNewspaper)
    .post("/create", verifyJWT, verifyRoles(Role.Admin, Role.Editor), addNewspaper)
    .delete("/delete/:provider", verifyJWT, verifyRoles(Role.Admin, Role.Editor), removeNewspaper)
    .put("/update", verifyJWT, verifyRoles(Role.Admin, Role.Editor), editNewspaper)


export default newspaperRouter;