import { Request, Response } from "express";
import { 
    filings
} from "../models/filing.model";


export const getFilings = async (req: Request, res: Response) => {
    const { cik } = req.query;

    if (!cik) {
        return res
            .status(400)
            .send("There has to be a cik.");
    }

    try {

        const filingResults = await filings(Number(cik));

        if (!filingResults.length) {
            return res
                .status(404)
                .send("There are no filings with this cik.");
        }

        return res
            .status(200)
            .send({
                "filings": filingResults
            });

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}
