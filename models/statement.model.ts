import connection from "../connection";
import Statement, { StatementDate, StatementTitle } from "../types/statement";
import {
    get,
    getTitles,
    getDates,
    getByFiling
} from "../queries/statement.query";


export const statements = async (filingId: number): Promise<Statement[]> => {
    try {
        const [rows] = await connection.query(getByFiling, [filingId]);
        return rows as Statement[];
    } catch (e) {
        console.error("There occured an error with retrieving the statements:", e);
        return []; 
    }
}

export const statement = async (statementId: number): Promise<Statement[]> => {
    try {
        const [rows] = await connection.query(get, [statementId]);
        return rows as Statement[];
    } catch (e) {
        console.error("There occured an error with retrieving the statement:", e);
        return []; 
    }
}

export const statementTitles = async (statementId: number): Promise<StatementTitle[]> => {
    try {
        const [rows] = await connection.query(getTitles, [statementId]);
        return rows as StatementTitle[];
    } catch (e) {
        console.error("There occured an error with retrieving the statement titles:", e);
        return []; 
    }
}

export const statementDates = async (statementId: number): Promise<StatementDate[]> => {
    try {
        const [rows] = await connection.query(getDates, [statementId]);
        return rows as StatementDate[];
    } catch (e) {
        console.error("There occured an error with retrieving the statement titles:", e);
        return []; 
    }
}
  