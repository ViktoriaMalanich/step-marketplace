import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne
} from "typeorm";
import { USER_ROLES, userRolesArray } from "../types";
import { Market } from "./Market";

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
