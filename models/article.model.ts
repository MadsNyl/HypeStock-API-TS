import connection from "../connection";
import Article, { ArticleCount } from "../types/article";
import Symbol from "../types/symbol";
import { 
    all,
    byTicker,
    byProvider,
    byTickerAndDays,
    countByProvidersAndDays,
    countByTickerAndDays,
    get,
    tickers,
    countByTickers
} from "../queries/article.query";


const allArticles = async (): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(all);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving all articles:", e);
        return [];
    }
}

const articlesByTicker = async (symbol: string, limit: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(byTicker, [symbol, limit]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving articles by ticker:", e);
        return [];
    }
}

const articlesByTickerAndDays = async (symbol: string, days: number, limit: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(byTickerAndDays, [symbol, days, limit]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving articles by ticker:", e);
        return [];
    }
}

const articlesByProvider = async (provider: string, limit: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(byProvider, [provider, limit]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving articles by provider:", e);
        return [];
    }
}

const articlesCountByTickerAndDays = async (symbol: string, days: number): Promise<ArticleCount[]> => {
    try {
        const [rows] = await connection.query(countByTickerAndDays, [symbol, days]);
        return rows as ArticleCount[];
    } catch (e) {
        console.error("Error retrieving count of articles by ticker and days:", e);
        return [];
    }
}

const articlesCountByProvidersAndDays = async (symbol: string, days: Number): Promise<ArticleCount[]> => {
    try {
        const [rows] = await connection.query(countByProvidersAndDays, [symbol, days]);
        return rows as ArticleCount[];
    } catch (e) {
        console.error("Error retrieving count of articles by provider:", e);
        return [];
    }
}

const article = async (id: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(get, [id]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving article by id:", e);
        return [];
    }
}

const articleTickers = async (id: number): Promise<Symbol[]> => {
    try {   
        const [rows] = await connection.query(tickers, [id]);
        return rows as Symbol[];
    } catch (e) {
        console.error("Error retrieving article tickers:", e);
        return [];
    }
}


export {
    allArticles,
    articlesByTicker,
    articlesByProvider,
    article,
    articleTickers,
    articlesCountByProvidersAndDays,
    articlesByTickerAndDays,
    articlesCountByTickerAndDays
}