import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { DELIVERY_STATUS } from "../../types";
import { findOneProduct, findProductsByIdList } from "../products/products.service";
import { validateStatusTransition } from "./order.validator";

type OrderItemInput = {
    productId: number;
    quantity: number;
};

export const getOrderById = async (orderId: number): Promise<Order> => {

    console.log("orderId", orderId);
    const orderRepo = DBconnection.getRepository(Order);

    const order = await orderRepo
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.items", "items")
        .leftJoinAndSelect("items.product", "product")
        .where("order.id = :orderId", { orderId })
        .getOne();

    console.log("order", order);
    if (!order) {
        throw new ErrorHendler(400, "Invalid orderId!!!!");
    }

    return order;
}

export const getOrderListByUserId = async (userId: number): Promise<Order[]> => {

    const orderRepo = DBconnection.getRepository(Order);
    const order = await orderRepo
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.items", "items")
        .leftJoinAndSelect("items.product", "product")
        .where("order.userId = :userId", { userId })
        .getMany();

    if (!order) {
        throw new ErrorHendler(400, "Invalid userId!!!!");
    }

    return order;
}


export const createOrder = async (userId: number, items: OrderItemInput[]): Promise<Order> => {

    const orderId = await DBconnection.transaction(async (manager) => {

        let total = 0;

        const productIds = items.map(item => item.productId);

        const productList = await findProductsByIdList(productIds);

        let orderItems = productList.map(product => {
            const item = items.find(elem => elem.productId == product.id) as OrderItemInput;

            total += product.price * item.quantity;

            return {
                orderId: 0,
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            }
        });


        const orderRepo = manager.getRepository(Order);
        const newOrder = await orderRepo.save({
            userId,
            amount: total,
            paymentStatus: "PENDING",
            deliveryStatus: "PROCESSING",
        });

        orderItems = orderItems.map(item => {
            return {
                ...item,
                orderId: newOrder.id
            }
        });

        const orderItemsRepo = manager.getRepository(OrderItem);

        const newItems = await orderItemsRepo
            .createQueryBuilder()
            .insert()
            .into(OrderItem)
            .values(orderItems)
            .execute();

        console.log("newItems", newItems);

        console.log("newOrder.id", newOrder.id);
        return newOrder.id;

    });
    const fullOrder = await getOrderById(orderId);

    return fullOrder;
};


export const modifyOrder = async (order: Order): Promise<Order> => {

    const orderRepo = DBconnection.getRepository(Order);

    await orderRepo.save(order);

    const newOrder = await getOrderById(order.id);

    return newOrder;
}

export const findOrderList = async () => {
    const orderRepo = DBconnection.getRepository(Order);
    const orderList = await orderRepo
        //  .find();
        .createQueryBuilder("Order")
        .getMany();

    return orderList;
}

export const modifyDeliveryStatus = async (
    orderId: number,
    newStatus: DELIVERY_STATUS
): Promise<Order> => {
    const orderRepo = DBconnection.getRepository(Order);
    const order = await getOrderById(orderId);

    if (!order) {
        throw new ErrorHendler(400, "Invalid orderId!!!!");
    }
    
    validateStatusTransition(order.deliveryStatus, newStatus);
    order.deliveryStatus = newStatus;

    await orderRepo.save(order);

    return order;
};


