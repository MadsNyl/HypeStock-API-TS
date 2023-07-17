import express from "express";
import { getAllSubreddits } from "../../controllers/reddit/subreddit.reddit.controller";
import verifyJWT from "../../middleware/verifyJWT.middleware";
import verifyRoles from "../../middleware/verifyRoles.middleware";
import Role from "../../enums/role";


const subredditRouter = express.Router();


subredditRouter
    .get("/", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getAllSubreddits)


export default subredditRouter;
