import express from "express";
import verifyJWT from "../../middleware/verifyJWT.middleware";
import verifyRoles from "../../middleware/verifyRoles.middleware";
import Role from "../../enums/role";
import { getStats } from "../../controllers/reddit/reddit.controller";


const redditRouter = express.Router();


redditRouter
    .get("/", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getStats)


export default redditRouter;
