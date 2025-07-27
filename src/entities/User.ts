import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany
} from "typeorm";
import { USER_ROLES, userRolesArray } from "../types";
import { Market } from "./Market";
import { Payment } from "./Payment";
import { PaymentMethod } from "./PaymentMethod";
import { Order } from "./Order";
import { Wishlist } from "./Wishlist";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        name: "firstName",
        type: "varchar",
        length: 45,
        nullable: true
    })
    firstName!: string;

    @Column({
        name: "lastName",
        type: "varchar",
        length: 45,
        nullable: false
    })
    lastName!: string;

    @Column({
        name: "email",
        type: "varchar",
        length: 45,
        unique: true,
        nullable: false
    })
    email!: string;

    @Column({
        type: "enum",
        enum: userRolesArray,
        default: "CUSTOMER"
    })
    role!: USER_ROLES;

    @Column({
        name: "password",
        type: "varchar",
        select: false,
        nullable: false,
    })
    password?: string;

    @Column({
        name: "phone",
        type: "varchar",
        length: 14,
        unique: true,
        nullable: false
    })
    phone!: string;

    @OneToOne(() => Market, (market) => market.owner)
    market?: Market;

    @OneToOne(() => Payment, (payment) => payment.user)
    payment!: Payment;

    @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
    paymentMethods!: PaymentMethod[];

    @OneToMany(() => Order, (order) => order.user)
    order!: Order[];

    @OneToMany(() => Wishlist, wishlist => wishlist.user)
    wishlists!: Wishlist[];

    @Column({
        name: "address",
        type: "varchar",
        length: 255,
        nullable: true
    })
    address!: string;

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
