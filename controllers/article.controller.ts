import { Request, Response } from "express";
import { articlesCountByDays, articlesCountLastDay, totalArticlesCount } from "../models/article.model";
import { articleWordsCount } from "../models/articleWords.model";


export const getArticleBaseData = async (req: Request, res: Response) => {
    
    const { days } = req.query;

    if (!days) {
        return res
            .status(400)
            .send("There has to be a number of days.");
    }

    try {

        const totalArticleCount = await totalArticlesCount();
        const articleCountLastDay = await articlesCountLastDay();
        const articleCountByDays = await articlesCountByDays(Number(days));
        const totalArticleWordsCount = await articleWordsCount();
        
        return res
            .status(200)
            .send({
                "total_article_count": totalArticleCount,
                "article_count_last_day": articleCountLastDay,
                "article_count_by_days": articleCountByDays,
                "total_article_words_count": totalArticleWordsCount
            });

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}