import { DBconnection } from "../../dbconnection";
import { Order } from '../../entities/Order';

export const getPaidOrdersTotal = async (
    startDate?: Date | null,
    endDate?: Date | null
): Promise<number> => {
    const orderRepo = DBconnection.getRepository(Order);

    const qb = orderRepo
        .createQueryBuilder('order')
        .select('SUM(order.amount)', 'total')
        .where('order.paymentStatus = :status', { status: 'PAID' });

    if (startDate) {
        qb.andWhere('order.createdAt >= :startDate', { startDate });
    }

    if (endDate) {
        qb.andWhere('order.createdAt < :endDate', { endDate });
    }

    const result = await qb.getRawOne();
    return Number(result.total) || 0;
};


export const findMarketSalesTotal = async (
    marketId: number,
    startDate?: Date | null,
    endDate?: Date | null
): Promise<number> => {

    const orderRepo = DBconnection.getRepository(Order);

    const result = await orderRepo
        .createQueryBuilder('order')
        .select('IFNULL(SUM(order.amount), 0)', 'total_sales')
        .innerJoin('order.items', 'orderItem')
        .innerJoin('orderItem.product', 'product')
        .innerJoin('product.market', 'market')
        .where('order.paymentStatus = :status', { status: 'PAID' })
        .andWhere('market.id = :marketId', { marketId })
        .andWhere(startDate ? 'order.createdAt >= :startDate' : '1=1', { startDate })
        .andWhere(endDate ? 'order.createdAt < :endDate' : '1=1', { endDate })
        .getRawOne();

    return Number(result.total_sales) || 0;
};
