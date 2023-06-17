import connection from "../connection";
import Tracking from "../types/tracking";
import {
    allByTicker,
    byTickerAndDays
} from "../queries/tracking.query";


const allTrackingsByTicker = async (symbol: string): Promise<Tracking[]> => {
    try {
        const [rows] = await connection.query(allByTicker, [symbol]);
        return rows as Tracking[];
    } catch (e) {
        console.error("Error retrieving trackings by ticker:", e);
        return [];
    }
}

const trackingsByTickerAndDays = async (symbol: string, days: number): Promise<Tracking[]> => {
    try {
        const [rows] = await connection.query(byTickerAndDays, [symbol, days]);
        return rows as Tracking[];
    } catch (e) {
        console.error("Error retrieving trackings by ticker and days:", e);
        return [];
    }
}


export {
    allTrackingsByTicker,
    trackingsByTickerAndDays
}