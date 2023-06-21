import { Request, Response } from "express";
import { allArticleWords } from "../models/articleWords.model";


export const getAllArticleWords = async (req: Request, res: Response) => {
    try {
        const articleWords = allArticleWords();

        return res
            .status(200)
            .send({
                "article_words": articleWords
            });
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}