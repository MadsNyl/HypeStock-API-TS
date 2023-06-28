import { Request, Response } from "express";
import { figureValues, initialFigures, statement, statementDates, statementTitles } from "../models/filing.model";
import { buildGraph } from "../util/graph";
import { FigureGraph } from "../types/figure";

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

        const figures = await initialFigures(Number(statementId));
        const allFigureValues = await figureValues(Number(statementId));

        figures.forEach(figure => {
            figure.values = allFigureValues.filter(value => value.figure == figure.id);
        });

        let graph: FigureGraph;

        if (figures.length) {
            graph = buildGraph(figures);
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