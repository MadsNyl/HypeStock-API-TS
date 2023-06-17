import express from "express";
import { getAllNewspapers, getNewspaper } from "../controllers/newspaper.controller";


const newspaperRouter = express.Router();


newspaperRouter
    .get("/", getAllNewspapers)
    .get("/get", getNewspaper)


export default newspaperRouter;