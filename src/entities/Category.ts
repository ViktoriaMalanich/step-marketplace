import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { Product } from "./Product";
import { CategorySpecificationUniqValue } from "./CategorySpecificationUniqValue";

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false
    })
    name!: string;

    @Column({
        name: "description",
        type: "mediumtext",
        nullable: true
    })
    description!: string;

    @Column({
        name: "img",
        type: "varchar",
        length: 255,
        unique: true,
        nullable: true
    })
    img!: string;

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

    @Column({
        name: "parentId",
        type: "int",
        nullable: true
    })
    parentId!: number | null;

    @ManyToOne(() => Category, (category) => category.subcategories, { nullable: true })
    @JoinColumn({
        name: "parentId"
    })
    parent!: Category | null;

    @OneToMany(() => Category, category => category.parent)
    subcategories!: Category[];

    @OneToMany(() => Product, product => product.market)
    products!: Product[];

    @OneToMany(() => CategorySpecificationUniqValue, csv => csv.category)
    categorySpecifications!: CategorySpecificationUniqValue[];


}
