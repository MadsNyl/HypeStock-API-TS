import connection from "../connection";
import Ticker from "../types/ticker";
import {
    all,
    byName,
    bySearch,
    bySymbol,
    bySymbolSearch,
    popular
} from "../queries/ticker.query";


export const allTickers = async (): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(all);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving all tickers:", e);
        return [];
    }
}

export const popularTickers = async (limit: number): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(popular, [limit]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving popular tickers:", e);
        return []; 
    }
}

export const tickerBySymbol = async (symbol: string): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(bySymbol, [symbol]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving ticker by symbol:", e);
        return [];
    }
}

export const tickerBySymbolSearch = async (symbol: string, limit: number): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(bySymbolSearch, [`%${symbol}%`, limit]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving ticker by symbol:", e);
        return [];
    }
}

export const tickersByName = async (name: string): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(byName, [`%${name}%`]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving tickers by name:", e);
        return [];
    }
}

export const tickersBySearch = async (search: string, limit: number): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(bySearch, [search, search, limit]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving tickers by search:", e);
        return [];
    }
}
