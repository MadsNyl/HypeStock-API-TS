import express from "express";
import { getAllArticleWords } from "../controllers/articleWords.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";


const articleWordsRouter = express.Router();

articleWordsRouter
    .get("/", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getAllArticleWords)


export default articleWordsRouter;