import connection from "../connection";
import Figure, { FigureValue } from "../types/figure";
import {
    get,
    getValues
} from "../queries/figure.query";


export const figures = async (statementId: number): Promise<Figure[]> => {
    try {
        const [rows] = await connection.query(get, [statementId]);
        return rows as Figure[];
    } catch (e) {
        console.error("There occured an error with retrieving the initial figures:", e);
        return [];
    }
}

export const figureValues = async (statementId: number): Promise<FigureValue[]> => {
    try {
        const [rows] = await connection.query(getValues, [statementId]);
        return rows as FigureValue[];
    } catch (e) {
        console.error("There occured an error with retrieving the figure values:", e);
        return []; 
    }
}
  