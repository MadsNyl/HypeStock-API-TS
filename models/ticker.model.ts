import connection from "../connection";
import Ticker from "../types/ticker";
import {
    all,
    byName,
    bySearch,
    bySymbol
} from "../queries/ticker.query";


const allTickers = async (): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(all);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving all tickers:", e);
        return [];
    }
}

const tickerBySymbol = async (symbol: string): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(bySymbol, [symbol]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving ticker by symbol:", e);
        return [];
    }
}

const tickersByName = async (name: string): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(byName, [`%${name}%`]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving tickers by name:", e);
        return [];
    }
}

const tickersBySearch = async (search: string, limit: number): Promise<Ticker[]> => {
    try {
        const [rows] = await connection.query(bySearch, [search, limit]);
        return rows as Ticker[];
    } catch (e) {
        console.error("Error retrieving tickers by search:", e);
        return [];
    }
}


export {
    allTickers,
    tickerBySymbol,
    tickersByName,
    tickersBySearch
}