import { Request, Response } from "express";
import { allNewspapers, createNewspaper, deleteNewspaper, newspaper, updateNewspaper} from "../models/newspaper.model";
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

const addNewspaper = async (req: Request, res: Response) => {

    const { provider, start_url, base_url, full_name } = req.body;

    if (
        !provider ||
        !start_url ||
        !base_url ||
        !full_name
    ) 
        return res
            .send("There are missing information.")
            .status(400);

    try {
        await createNewspaper(provider, start_url, base_url, full_name);

        return res
            .send("Newspaper created.")
            .status(201);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }


}

const removeNewspaper = async (req: Request, res: Response) => {

    const { provider } = req.query;

    if (!provider) {
        return res
            .send("There has to be a provider.")
            .status(400);
    }

    try {   
        await deleteNewspaper(provider.toString());

        return res  
            .send("Provider deleted.")
            .status(204);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }

}

const editNewspaper = async (req: Request, res: Response) => {

    const { provider, start_url, base_url, full_name } = req.body;

    if (
        !provider ||
        !start_url ||
        !base_url ||
        !full_name
    ) {
        return res
            .send("There are missing information.")
            .status(400);
    }

    try {
        await updateNewspaper(provider, start_url, base_url, full_name);

        return res
            .send("Newspaper updated.")
            .status(204);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }

}


export {
    getAllNewspapers,
    getNewspaper,
    addNewspaper,
    removeNewspaper,
    editNewspaper
}