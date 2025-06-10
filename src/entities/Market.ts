import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    OneToOne
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity({ name: 'market' })
export class Market {
    @PrimaryGeneratedColumn("increment")
    id!: number; 

    @Column({
        name: 'name',
        type: 'varchar',
        unique: true,
        nullable: false
    })
    name!: string;

    @Column({
        name: "description",
        type: "text",
        nullable: true
    })
    description!: string;

    @Column({
        name: "logo",
        type: "varchar",
        unique: true,
        nullable: true
    })
    img!: string;

    @Column({
        name: "isActive",
        type: "boolean",
        nullable: false
    })
    isActive!: boolean;

    @Column({
        name: "phones",
        type: "json", 
        unique: true,
        nullable: false
    })
    phones!: string[];

    @Column({
        name: "emails",
        type: "json", 
        unique: true,
        nullable: false
    })
    emails!: string[];

    @Column({
        name: "address",
        type: "text",
        nullable: false
    })
    address!: string;

    @Column({
        name: 'ownerId',
        type: "int",
        unsigned: true,
        nullable: false
    })
    ownerId!: number;

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

    @OneToOne(() => User)
    @JoinColumn({ name: "ownerId" }) 
    owner!: User;

    @OneToMany(() => Product, product => product.market)
    products!: Product[];

}
