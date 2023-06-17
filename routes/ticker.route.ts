import express from "express";
import { getAllTickers, getTicker, getTickersBySearch, getTickersBySymbolOrName } from "../controllers/ticker.controller";


const tickerRouter = express.Router();


tickerRouter
    .get("/", getAllTickers)
    .get("/get_more", getTickersBySymbolOrName)
    .get("/get", getTicker)
    .get("/search", getTickersBySearch)


export default tickerRouter;