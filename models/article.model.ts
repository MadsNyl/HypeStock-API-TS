import connection from "../connection";
import Article, { ArticleCount } from "../types/article";
import Count from "../types/count";
import Symbol from "../types/symbol";
import CountDate from "../types/countDate";
import { 
    all,
    byTicker,
    byProvider,
    byTickerAndDays,
    countByProvidersAndDays,
    countByTickerAndDays,
    get,
    tickers,
    countByTickers,
    count,
    countLastDay,
    countByDays,
    countEachHour
} from "../queries/article.query";


export const allArticles = async (): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(all);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving all articles:", e);
        return [];
    }
}

export const articlesByTicker = async (symbol: string, limit: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(byTicker, [symbol, limit]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving articles by ticker:", e);
        return [];
    }
}

export const articlesByTickerAndDays = async (symbol: string, days: number, limit: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(byTickerAndDays, [symbol, days, limit]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving articles by ticker:", e);
        return [];
    }
}

export const articlesByProvider = async (provider: string, limit: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(byProvider, [provider, limit]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving articles by provider:", e);
        return [];
    }
}

export const articlesCountByTickerAndDays = async (symbol: string, days: number): Promise<ArticleCount[]> => {
    try {
        const [rows] = await connection.query(countByTickerAndDays, [symbol, days]);
        return rows as ArticleCount[];
    } catch (e) {
        console.error("Error retrieving count of articles by ticker and days:", e);
        return [];
    }
}

export const articlesCountByProvidersAndDays = async (symbol: string, days: Number): Promise<ArticleCount[]> => {
    try {
        const [rows] = await connection.query(countByProvidersAndDays, [symbol, days]);
        return rows as ArticleCount[];
    } catch (e) {
        console.error("Error retrieving count of articles by provider:", e);
        return [];
    }
}

export const article = async (id: number): Promise<Article[]> => {
    try {
        const [rows] = await connection.query(get, [id]);
        return rows as Article[];
    } catch (e) {
        console.error("Error retrieving article by id:", e);
        return [];
    }
}

export const articleTickers = async (id: number): Promise<Symbol[]> => {
    try {   
        const [rows] = await connection.query(tickers, [id]);
        return rows as Symbol[];
    } catch (e) {
        console.error("Error retrieving article tickers:", e);
        return [];
    }
}

export const totalArticlesCount = async (): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(count);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving total article count:", e);
        return [];
    }
}

export const articlesCountLastDay = async (): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(countLastDay);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving article count last 24 hours:", e);
        return [];
    }
}

export const articlesCountByDays = async (days: number): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(countByDays, [days]);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving article count by days:", e);
        return [];
    }
}

export const articlesCountEachHour = async (): Promise<CountDate[]> => {
    try {
        const [rows] = await connection.query(countEachHour);
        return rows as CountDate[];
    } catch (e) {
        console.error("Error retrieving article count for each hour:", e);
        return [];
    }
}