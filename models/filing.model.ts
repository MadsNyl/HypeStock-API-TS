import connection from "../connection";
import Filing from "../types/filing";
import {
    getByCik
} from "../queries/filing.query";

export const filings = async (cik: number): Promise<Filing[]> => {
    try {
        const [rows] = await connection.query(getByCik, [cik]);
        return rows as Filing[];
    } catch (e) {
        console.error("There occured an error with retrieving the filing:", e);
        return []; 
    }
}
  