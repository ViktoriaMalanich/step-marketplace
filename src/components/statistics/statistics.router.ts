import { json, Router } from "express";
import { getMarketSalesTotal, getOrdersTotal } from "./statistics.controller";

const router = Router();

router.get('/total', getOrdersTotal);

router.get('/market-total/:marketId', getMarketSalesTotal);

export const StatisticsRouter = router;