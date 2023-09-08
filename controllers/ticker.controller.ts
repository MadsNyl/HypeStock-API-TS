import { Request, Response } from "express"
import { allTickers, popularTickers, tickerBySymbol, tickerBySymbolSearch, tickersByName, tickersBySearch } from "../models/ticker.model";
import { trackingsByTickerAndDays } from "../models/tracking.model";
import { articlesByTickerAndDays, articlesCountByProvidersAndDays, articlesCountByTicker, articlesCountByTickerAndDays } from "../models/article.model";
import { commentCountByTicker } from "../models/reddit/comment.reddit.model";

export const getAllTickers = async (_req: Request, res: Response)  => {
    try {
        const tickers = await allTickers();

        return res
            .send({
                "tickers": tickers
            })
            .status(200);
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getPopularTickers = async (req: Request, res: Response) => {
    const { limit } = req.query;

    if (!limit) {
        return res
            .status(400)
            .send("There has to be a limit.");
    }

    try {
        const tickers = await popularTickers(Number(limit));

        return res
            .status(200)
            .send({
                "tickers": tickers
            });

        } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getTickersBySymbolOrName = async (req: Request, res: Response) => {
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

export const getTicker = async (req: Request, res: Response) => {
    const { symbol, days, limit } = req.query;

    if (!symbol || !days || !limit) {
        return res  
            .send("There have to be a ticker symbol, limit of days and limit of articles.")
            .status(400);
    }

    try {
        const result = await tickerBySymbol(symbol.toString());

        if (!result.length) {
            return res
                .status(404)
                .send("There is no match for this ticker.");
        }

        const priceTrackings = await trackingsByTickerAndDays(symbol.toString(), Number(days));
        const articleTrackings = await articlesCountByTickerAndDays(symbol.toString(), Number(days));
        const providers = await articlesCountByProvidersAndDays(symbol.toString(), Number(days));
        const articles = await articlesByTickerAndDays(symbol.toString(), Number(days), Number(limit));
        const totalRedditComments = await commentCountByTicker(symbol.toString());
        const totalArticleCount = await articlesCountByTicker(symbol.toString());

        return res
            .send({
                "ticker": result[0],
                "tracking": {
                    "prices": priceTrackings,
                    "articles": articleTrackings
                },
                "providers": providers,
                "articles": articles,
                "redditCommentsCount": totalRedditComments,
                "articlesCount": totalArticleCount
            })
            .status(200);

    } catch (e) {
        console.log(e);
        return res.send("There occured an error.").status(500);
    }
}

export const getTickersBySearch = async (req: Request, res: Response) => {
    const { search, limit } = req.query;

    if (!search || !limit) {
        return res  
            .status(400)
            .send("There have to be a search for a ticker name or symbol and a limit.");
    }

    try {
        const results = await tickersBySearch(search.toString(), Number(limit));

        return res
            .status(200)
            .send({
                "tickers": results
            });
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getTickersBySymbolSearch = async (req: Request, res: Response) => {
    const { search, limit } = req.query;

    if (!search || !limit) {
        return res  
            .send("There have to be a search for a ticker name or symbol and a limit.")
            .status(400);
    }

    try {
        const results = await tickerBySymbolSearch(search.toString(), Number(limit));

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
