import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import { Specification } from "./Specification";
import { Product } from "./Product";

@Entity("product_specifications_values")
@Unique(["product", "specification"])
export class ProductSpecificationValue {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @ManyToOne(() => Product, product => product.specificationValues,
        {
            onDelete: "CASCADE",
        })
    @JoinColumn({ name: "productId" })
    product!: Product;

    @ManyToOne(() => Specification, specification => specification.productValues,
        {
            onDelete: "CASCADE",
        })
    @JoinColumn({ name: "specId" }) 
    specification!: Specification;

    @Column({ type: "varchar", length: 255 })
    value!: string;


    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}