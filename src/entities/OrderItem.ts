import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity({
    name: "order_item"
})

export class OrderItem {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        name: "productId",
        type: "int",
        nullable: true
    })
    productId!: number | null;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "productId" })
    product!: Product

    @Column({
        name: "orderId",
        type: "int",
        nullable: true
    })
    orderId!: number | null;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: "orderId" })
    order!: Order

    @Column({
        name: 'price',
        type: 'int',
        nullable: true,
        default: null
    })
    price!: number;

    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false,
        default: 1
    })
    quantity!: number;
}
