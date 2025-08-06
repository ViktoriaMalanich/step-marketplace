import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Market } from "../../entities/Market";
import { deletePhotoes, uploadImage } from "../../services/cloudinary.service";

export const findMarketList = async () => {
    const marketRepo = DBconnection.getRepository(Market);
    const marketList = await marketRepo
        .find();
    return marketList;
}

export const findOneMarket = async (marketIdOrName: number | string): Promise<Market> => {

    console.log("marketIdOrName", marketIdOrName);
    const marketRepo = DBconnection.getRepository(Market);
    const market: Market | null = await marketRepo
        .createQueryBuilder("market")
        .where("market.id = :marketIdOrName OR market.name = :marketIdOrName", { marketIdOrName })
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
    const market = await marketRepo.findOneBy({ id: marketId });

    if (!market) {
        throw new ErrorHendler(404, "Market not found");
    }
    return await marketRepo.save({ id: marketId, ...data });
}


export const removeMarket = async (marketId: number) => {

    const marketRepo = DBconnection.getRepository(Market); 

    const market = await marketRepo.findOneBy({ id: marketId });

    if (!market) {
        throw new ErrorHendler(404, "Market not found");
    }

    await marketRepo.delete(marketId);
}

export const updateMarketPhoto = async (
    marketId: number,
    file: Express.Multer.File
): Promise<Market> => {

    const marketRepo = DBconnection.getRepository(Market);

    const existingMarket = await marketRepo.findOneBy({ id: marketId });
    if (!existingMarket) {
        throw new ErrorHendler(404, 'Market not found');
    }
    const uploadedImage = await uploadImage(file.path); 
    await deletePhotoes([existingMarket.img]);    
    const updatedMarket = await marketRepo.save({
        ...existingMarket,
        img: uploadedImage.secure_url,
    });

    return updatedMarket;
};



