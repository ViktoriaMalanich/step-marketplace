import { Request, Response, NextFunction } from "express";
import {
    findMarketList,
    findOneMarket,
    createMarket,
    updateMarket,
    removeMarket,
    findOwnerMarket
} from "./market.service";
import { ErrorHendler } from "../../classes/ErrorHandler";

export const getMarketList = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const market = await findMarketList();
        res.status(200).json(market);
    }
    catch (error) {
        next(error);
    }
}

export const getOneMarket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req.params.idOrName", req.params.idOrName);
        const market = await findOneMarket(req.params.idOrName);
        res.status(200).json(market);
    }
    catch (error) {
        next(error);
    }
}

export const getOwnerMarket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req.params.ownerId", req.params.ownerId);
        const market = await findOwnerMarket(req.params.ownerId);
        res.status(200).json(market);
    }
    catch (error) {
        next(error);
    }
}


export const addNewMarket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newMarket = await createMarket(req.body);
        res.status(201).json(newMarket);

    } catch (error) {
        next(error);
    }
}


export const modifyMarket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const market = await findOneMarket(req.params.id);
        if (!market) {
            throw new ErrorHendler(404, "Market not found");
        }
        const modifyedMarket = await updateMarket(Number(req.params.id), { ...market, ...req.body });
        res.status(200).json(modifyedMarket);

    } catch (error) {
        next(error);
    }
}


export const deleteMarket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeMarket(Number(req.params.id));
        res.status(204).send();

    } catch (error) {
        next(error);
    }
}