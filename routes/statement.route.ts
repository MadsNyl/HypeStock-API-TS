import express from "express";
import { getStatement, getStatements } from "../controllers/statement.controller"; 

const statementRouter = express.Router();


statementRouter
    .get("/", getStatement)
    .get("/get", getStatements)


export default statementRouter;