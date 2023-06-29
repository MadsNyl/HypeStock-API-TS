import express from "express";
import { getFilings } from "../controllers/filing.controller"; 

const filingRouter = express.Router();


filingRouter
    .get("/", getFilings)


export default filingRouter;
