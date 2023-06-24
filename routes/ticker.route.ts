import express from "express";
import { getAllTickers, getTicker, getTickersBySearch, getTickersBySymbolOrName, getTickersBySymbolSearch } from "../controllers/ticker.controller";


const tickerRouter = express.Router();


tickerRouter
    .get("/", getAllTickers)
    .get("/get_more", getTickersBySymbolOrName)
    .get("/get", getTicker)
    .get("/search", getTickersBySearch)
    .get("/symbol_search", getTickersBySymbolSearch)


export default tickerRouter;