import express from "express";
import { getStatement } from "../controllers/filing.controller"; 

const filingRouter = express.Router();


filingRouter
    .get("/", getStatement)


export default filingRouter;
