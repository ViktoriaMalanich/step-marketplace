import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, Column } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


@Entity({
    name: "wishlists"
})

export class Wishlist {
    @PrimaryColumn({
        name: "userId",
        type: "int",
        unsigned: true
    })
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

    @PrimaryColumn({
        name: "productId",
        type: "int",
        unsigned: true
    })
    productId!: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "productId" })
    product!: Product;

    @Column({
        name: "createdAt",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;
}


