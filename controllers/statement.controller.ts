import { Request, Response } from "express";
import { buildGraph } from "../util/graph";
import { FigureGraph } from "../types/figure";
import {
    statement,
    statementTitles,
    statementDates,
    statements
} from "../models/statement.model";
import {
    figures,
    figureValues
} from "../models/figure.model";


export const getStatements = async (req: Request, res: Response) => {
    const { filingId } = req.query;

    if (!filingId) {
        return res
            .status(400)
            .send("There has to be a filing id.");
    }

    try {

        const statementResults = await statements(Number(filingId));

        return res
            .status(200)
            .send({
                "statements": statementResults
            });

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getStatement = async (req: Request, res: Response) => {
    const { statementId } = req.query;

    if (!statementId) {
        return res
            .status(400)
            .send("There has to be a statement id.");
    }

    try {

        const statements = await statement(Number(statementId));

        if (!statements.length) {
            return res
                .status(404)
                .send("There are no statement with this id.");
        }

        const titles = await statementTitles(Number(statementId));
        const dates = await statementDates(Number(statementId));

        statements[0].titles = titles;
        statements[0].dates = dates;

        const statementFigures = await figures(Number(statementId));
        const allFigureValues = await figureValues(Number(statementId));

        statementFigures.forEach(figure => {
            figure.values = allFigureValues.filter(value => value.figure == figure.id);
        });

        let graph: FigureGraph;

        if (statementFigures.length) {
            graph = buildGraph(statementFigures);
            statements[0].figures = graph;
        }


        return res
            .status(200)
            .send({
                "statement": statements[0]
            })


    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}