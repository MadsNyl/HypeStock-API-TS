import express from "express";
import { getArticleBaseData } from "../controllers/article.controller";


const articleRouter = express.Router();


articleRouter
    .get("/base", getArticleBaseData)


export default articleRouter;
