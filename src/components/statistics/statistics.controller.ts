import { Request, Response, NextFunction } from 'express';
import { findMarketSalesTotal, getPaidOrdersTotal } from './statistics.service';
import { ErrorHendler } from '../../classes/ErrorHandler';

export const getOrdersTotal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate } = req.query;

        if (startDate && isNaN(Date.parse(startDate as string))) {
            throw new ErrorHendler(400, 'Invalid startDate format');
        }
        if (endDate && isNaN(Date.parse(endDate as string))) {
            throw new ErrorHendler(400, 'Invalid endDate format');
        }

        const start = startDate ? new Date(String(startDate)) : undefined;
        const end = endDate ? new Date(String(endDate)) : undefined;

        const totalAmount = await getPaidOrdersTotal(start, end);

        res.status(200).json({ totalAmount });
    } catch (error) {
        next(error);
    }
};

export const getMarketSalesTotal = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const marketId = Number(req.params.marketId);
        console.log(marketId);
        const {startDate, endDate } = req.query;

        if (!marketId) {
            throw new ErrorHendler(400, 'marketId parameter is required');
        }

        if (startDate && isNaN(Date.parse(startDate as string))) {
            throw new ErrorHendler(400, 'Invalid startDate format');
        }

        if (endDate && isNaN(Date.parse(endDate as string))) {
            throw new ErrorHendler(400, 'Invalid endDate format');
        }

        const start = startDate ? new Date(String(startDate)) : undefined;
        const end = endDate ? new Date(String(endDate)) : undefined;

        const totalSales = await findMarketSalesTotal(marketId, start, end);

        res.status(200).json({ totalSales });
    } catch (error) {
        next(error);
    }
};
