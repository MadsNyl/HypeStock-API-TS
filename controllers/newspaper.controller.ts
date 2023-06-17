import { Request, Response } from "express"
import { allNewspapers, newspaper} from "../models/newspaper.model"
import { articleTickers, articlesByProvider } from "../models/article.model";


const getAllNewspapers = async (_req: Request, res: Response) => {
    try {
        const newspapers = await allNewspapers();

        return res
            .send({
                "newspapers": newspapers
            })
            .status(200);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

const getNewspaper = async (req: Request, res: Response) => {

    const { provider, limit } = req.query;

    if (!provider || !limit) {
        return res
            .send("There have to be a newspaper provider and a limit.")
            .status(400);
    }

    try {
        const result = await newspaper(provider.toString());
        let articles = await articlesByProvider(provider.toString(), Number(limit));

        for (let article of articles) {
            article.tickers = await articleTickers(article.id);
        }

        if (result.length) {
            result[0].articles = articles
        }

        return res
            .send({
                "newspapers": result
            })
            .status(200);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}


export {
    getAllNewspapers,
    getNewspaper
}