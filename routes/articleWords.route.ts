import express from "express";
import { 
    addArticleWord,
    editArticleWord,
    getAllArticleWords,
    getArticleWord,
    removeArticleWord 
} from "../controllers/articleWords.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import verifyRoles from "../middleware/verifyRoles.middleware";
import Role from "../enums/role";


const articleWordsRouter = express.Router();

articleWordsRouter
    .get("/", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getAllArticleWords)
    .get("/:id", verifyJWT, verifyRoles(Role.Admin, Role.Editor), getArticleWord)
    .post("/create", verifyJWT, verifyRoles(Role.Admin, Role.Editor), addArticleWord)
    .put("/update", verifyJWT, verifyRoles(Role.Admin, Role.Editor), editArticleWord)
    .delete("/delete/:id", verifyJWT, verifyRoles(Role.Admin, Role.Editor), removeArticleWord)


export default articleWordsRouter;