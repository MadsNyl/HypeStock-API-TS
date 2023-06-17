import { Request, Response } from "express"
import { allTickers, tickerBySymbol, tickersByName, tickersBySearch } from "../models/ticker.model";
import { trackingsByTickerAndDays } from "../models/tracking.model";
import { articlesByTickerAndDays, articlesCountByProvidersAndDays, articlesCountByTickerAndDays } from "../models/article.model";

const getAllTickers = async (_req: Request, res: Response)  => {
    try {
        const tickers = await allTickers();

        return res
            .send({
                "tickers": tickers
            })
            .status(200);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

const getTickersBySymbolOrName = async (req: Request, res: Response) => {
    const { symbol, name } = req.query;

    if (!symbol && !name) {
        return res
            .send("There have to be a ticker symbol or name.")
            .status(400);
    }

    if (symbol && name) {
        return res  
            .send("There have to be only a ticker symbol or name.")
            .status(400);
    }
    
    try {
        if (symbol) {
            const result = await tickerBySymbol(symbol.toString());
            
            return res
                .send({
                    "tickers": result
                })
                .status(200);
        } 

        if (name) {
            const result = await tickersByName(name.toString());

            return res
                .send({
                    "tickers": result
                })
                .status(200);
        }
        
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

const getTicker = async (req: Request, res: Response) => {
    const { symbol, days, article_limit } = req.query;

    if (!symbol || !days || !article_limit) {
        return res  
            .send("There have to be a ticker symbol, limit of days and limit of articles.")
            .status(400);
    }

    try {
        const result = await tickerBySymbol(symbol.toString());
        const priceTrackings = await trackingsByTickerAndDays(symbol.toString(), Number(days));
        const articleTrackings = await articlesCountByTickerAndDays(symbol.toString(), Number(days));
        const providers = await articlesCountByProvidersAndDays(symbol.toString(), Number(days));
        const articles = await articlesByTickerAndDays(symbol.toString(), Number(days), Number(article_limit));

        return res
            .send({
                "ticker": result,
                "tracking": {
                    "prices": priceTrackings,
                    "articles": articleTrackings
                },
                "providers": providers,
                "articles": articles
            })
            .status(200);

    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

const getTickersBySearch = async (req: Request, res: Response) => {
    const { search, limit } = req.query;

    if (!search || !limit) {
        return res  
            .send("There have to be a search for a ticker name or symbol and a limit.")
            .status(400);
    }

    try {
        const results = await tickersBySearch(search.toString(), Number(limit));

        return res
            .send({
                "tickers": results
            })
            .status(200);
    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}


export {
    getAllTickers,
    getTickersBySymbolOrName,
    getTicker,
    getTickersBySearch
}