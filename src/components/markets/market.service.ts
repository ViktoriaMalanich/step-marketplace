import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Market } from "../../entities/Market";

export const findMarketList = async () => {
    const marketRepo = DBconnection.getRepository(Market);
    const marketList = await marketRepo
        .find();
    // .createQueryBuilder("Market")
    // .getMany();

    return marketList;
}

export const findOneMarket = async (marketIdOrName: number | string): Promise<Market> => {

    console.log("marketIdOrName", marketIdOrName);
    const marketRepo = DBconnection.getRepository(Market);
    const market: Market | null = await marketRepo
        .createQueryBuilder("market")
        .where("market.id = :marketIdOrName OR market.name = :marketIdOrName", { marketIdOrName })
        //добавить получения по айди владельца
        .getOne();

    if (!market) {
        throw new ErrorHendler(404, 'Market not found');
    }

    return market;
}


export const findOwnerMarket = async (ownerId: number | string): Promise<Market> => {

    console.log("ownerId", ownerId);
    const marketRepo = DBconnection.getRepository(Market);
    const market: Market | null = await marketRepo
        .createQueryBuilder("market")
        .where("market.ownerId = :ownerId", { ownerId })
        .getOne();

    if (!market) {
        throw new ErrorHendler(404, 'Market not found');
    }

    return market;
}

export const createMarket = async (market: Market): Promise<Market> => {

    const marketRepo = DBconnection.getRepository(Market);
    const newMarket = await marketRepo.save(market);
    return newMarket;
}

export const updateMarket = async (marketId: number, data: Partial<Market>): Promise<Market> => {
    const marketRepo = DBconnection.getRepository(Market);
    // const market = await marketRepo
    //     .save({
    //         id: marketId,
    //         ...data
    //     });
    // return market;
    const market = await marketRepo.findOneBy({ id: marketId });

    if (!market) {
        throw new ErrorHendler(404, "Market not found");
    }

    return await marketRepo.save({ id: marketId, ...data });
}

export const removeMarket = async (marketId: number) => {
    const marketRepo = DBconnection.getRepository(Market);
    // await marketRepo
    //     .createQueryBuilder()
    //     .delete()
    //     .from(Market)
    //     .where("id = :id", { id: marketId })
    //     .execute();

    const market = await marketRepo.findOneBy({ id: marketId });

    if (!market) {
        throw new ErrorHendler(404, "Market not found");
    }

    await marketRepo.delete(marketId);
}