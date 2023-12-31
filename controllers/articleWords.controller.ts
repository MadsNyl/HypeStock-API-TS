import { Request, Response } from "express";
import { allArticleWords, articleWordById, articleWordsCount, createArticleWord, deleteArticleWord, updateArticleWord } from "../models/articleWords.model";
import { tickerBySymbol } from "../models/ticker.model";


export const getAllArticleWords = async (req: Request, res: Response) => {

    const { limit, page } = req.query;

    if (!limit || !page) {
        return res
            .status(400)
            .send("There has to be a limit and a page number.");
    }

    try {
        const articleWords = await allArticleWords(Number(limit), Number(page) - 1);
        const totalRows = await articleWordsCount();

        if (!articleWords.length || !totalRows.length) {
            return res
                .status(404)
                .send("There are no homographs.");
        }

        const totalPages = Math.ceil(Number(totalRows[0].count) / Number(limit));
        let nextPageUrl: string | null;
        let prevPageUrl: string | null;

        if (totalPages === Number(page)) {
            nextPageUrl = null;
        } else {
            nextPageUrl = `/homograph?limit=${limit}&page=${Number(page) + 1}`;
        }

        if (Number(page) <= 1) {
            prevPageUrl = null;
        } else {
            prevPageUrl = `/homograph?limit=${limit}&page=${Number(page) - 1}`;
        }

        return res
            .status(200)
            .send({
                "next_page": nextPageUrl,
                "prev_page": prevPageUrl,
                "homographs": articleWords
            });
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getArticleWord = async (req: Request, res: Response) => {

    const { id } = req.params;

    if (!id) {
        return res
            .status(400)
            .send("There has to be an id.");
    }

    try {

        const articleWord = await articleWordById(Number(id));

        if (!articleWord.length) {
            return res
                .status(404)
                .send("There is no match in the db.");
        }

        const ticker = await tickerBySymbol(articleWord[0].word);

        return res
            .status(200)
            .send({
                "ticker": ticker,
                "homograph": articleWord
            });

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const addArticleWord = async (req: Request, res: Response) => {
    
    const { word, description } = req.body;


    if (!word || !description) {
        return res
            .status(400)
            .send("There need to be both a word and a description.");
    }

    const isUpperCaseInTickerRange = /^[A-Z]{1,5}$/.test(word.toString());

    if (!isUpperCaseInTickerRange) {
        return res
            .status(400)
            .send("The word needs to be a stock ticker, which is 1 to 5 characters long and in uppercase.");
    }
    
    try {

        const tickerMatch = await tickerBySymbol(word.toString());

        if (!tickerMatch.length) {
            return res
                .status(404)
                .send("The provided word is not a homograph with a stock ticker. There is no value in adding this word.");
        }

        await createArticleWord(word.toString(), description.toString());

        return res
            .status(201)
            .send("Article word created.");
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const editArticleWord = async (req: Request, res: Response) => {

    const { id, description } = req.body;

    if (!id || !description) {
        return res
            .status(400)
            .send("There need to be both an id and a description.");
    }

    try {
        await updateArticleWord(Number(id), description.toString());

        return res
            .status(204)
            .send("Article word updated.")
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }

}

export const removeArticleWord = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res
            .status(400)
            .send("There has to be an id.");
    }

    try {
        await deleteArticleWord(Number(id));

        return res
            .status(204)
            .send("Article word deleted.");
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}