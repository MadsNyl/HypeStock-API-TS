import connection from "../connection";
import { getFigureValues, getInitialFigures, getStatement, getStatementDates, getStatementTitles } from "../queries/filing.query";
import Figure, { FigureValue } from "../types/figure";
import Statement, { StatementDate, StatementTitle } from "../types/statement";


export const initialFigures = async (statementId: number): Promise<Figure[]> => {
    try {
        const [rows] = await connection.query(getInitialFigures, [statementId]);
        return rows as Figure[];
    } catch (e) {
        console.error("There occured an error with retrieving the initial figures:", e);
        return [];
    }
}

export const figureValues = async (statementId: number): Promise<FigureValue[]> => {
    try {
        const [rows] = await connection.query(getFigureValues, [statementId]);
        return rows as FigureValue[];
    } catch (e) {
        console.error("There occured an error with retrieving the figure values:", e);
        return []; 
    }
}

export const statement = async (statementId: number): Promise<Statement[]> => {
    try {
        const [rows] = await connection.query(getStatement, [statementId]);
        return rows as Statement[];
    } catch (e) {
        console.error("There occured an error with retrieving the statement:", e);
        return []; 
    }
}

export const statementTitles = async (statementId: number): Promise<StatementTitle[]> => {
    try {
        const [rows] = await connection.query(getStatementTitles, [statementId]);
        return rows as StatementTitle[];
    } catch (e) {
        console.error("There occured an error with retrieving the statement titles:", e);
        return []; 
    }
}

export const statementDates = async (statementId: number): Promise<StatementDate[]> => {
    try {
        const [rows] = await connection.query(getStatementDates, [statementId]);
        return rows as StatementDate[];
    } catch (e) {
        console.error("There occured an error with retrieving the statement titles:", e);
        return []; 
    }
}
  