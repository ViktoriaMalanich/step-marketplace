import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { DELIVERY_STATUS, diliveryStatusArray, PAYMENT_STATUS, paymentStatusArray } from "../types";
import { OrderItem } from "./OrderItem";


@Entity({
    name: "order"
})
export class Order {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        name: "userId",
        type: "int",
        nullable: true
    })
    userId!: number | null;

    @ManyToOne(() => User, user => user.order)
    @JoinColumn({ name: "userId" })
    user!: User

    @OneToMany(() => OrderItem, item => item.order)
    items!: OrderItem[];

    @Column({
        name: "amount",
        type: "int",
        nullable: true
    })
    amount!: number | null;

    @Column({
        name: "paymentStatus",
        type: "enum",
        enum: paymentStatusArray,
        default: "NONE"
    })
    paymentStatus!: PAYMENT_STATUS

    @Column({
        name: "deliveryStatus",
        type: "enum",
        enum: diliveryStatusArray,
        default: "NONE"
    })
    deliveryStatus!: DELIVERY_STATUS

    @Column({
        name: "createdAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
        nullable: true
    })
    createdAt!: Date;

    @Column({
        name: "updatedAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        nullable: true
    })
    updatedAt!: Date;
}