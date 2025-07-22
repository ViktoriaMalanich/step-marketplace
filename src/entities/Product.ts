import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany
} from "typeorm";
import { Market } from "./Market";
import { Category } from "./Category";
import { PRODUCT_STATUS, productStatusArray } from "../types";
import { ProductSpecificationValue } from "./ProductSpecificationValue";
import { Wishlist } from "./Wishlist";



@Entity({ name: 'product' })
export class Product {
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
        name: "img",
        type: "json",
        nullable: true
    })
    img!: { public_id: string; secure_url: string }[];

    @Column({
        name: 'price',
        type: 'int',
        unsigned: true
    })
    price!: number;

    @Column({
        name: "status",
        type: "enum",
        enum: productStatusArray,
        nullable: true
    })
    status!: PRODUCT_STATUS;

    @Column({
        name: 'marketId',
        type: "int",
        unsigned: true,
        nullable: false
    })
    marketId!: number;

    @Column({
        name: 'categoryId',
        type: "int",
        unsigned: true,
        nullable: false
    })
    categoryId!: number;


    @ManyToOne(type => Category, category => category.id, { onDelete: 'CASCADE' })// может не касакад?
    @JoinColumn({ name: 'categoryId' })
    category!: Category;

    @ManyToOne(() => Market, market => market.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'marketId' })
    market!: Market;

    @OneToMany(() => ProductSpecificationValue, psv => psv.product)
    specificationValues!: ProductSpecificationValue[];

    @OneToMany(() => Wishlist, wishlist => wishlist.product)
    wishlists!: Wishlist[];
}
