import { Request, Response, NextFunction } from 'express';
import { findMarketSalesTotal, getPaidOrdersTotal } from './statistics.service';
import { ErrorHendler } from '../../classes/ErrorHandler';
import { ordersStatisticsQueryValidator } from './statistics.validator';
import { findOneMarket } from '../markets/market.service';


export const getOrdersTotal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validQuery = ordersStatisticsQueryValidator.parse(req.query);
        const { startDate, endDate } = validQuery;
        console.log({ startDate, endDate });
        const totalAmount = await getPaidOrdersTotal(startDate, endDate);
        res.status(200).json({ totalAmount });
    } catch (error) {
        next(error);
    }
};

export const getMarketSalesTotal = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const marketId = Number(req.params.marketId);
        const market = findOneMarket(marketId);

        if (!market) {
            throw new ErrorHendler(400, 'Invalid marketId');
        }

        const validQuery = ordersStatisticsQueryValidator.parse(req.query);

        const { startDate, endDate } = validQuery;

        const totalAmount = await findMarketSalesTotal(marketId, startDate, endDate);

        res.status(200).json({ totalAmount });
    } catch (error) {
        next(error);
    }
};
