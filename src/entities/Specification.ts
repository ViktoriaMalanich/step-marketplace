import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import { CategorySpecificationUniqValue } from "./CategorySpecificationUniqValue";
import { ProductSpecificationValue } from "./ProductSpecificationValue";



@Entity({ name: 'specification' })
export class Specification {
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
        name: "measurement",
        type: 'varchar',
        nullable: false
    })
    measurement!: string

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

    @OneToMany(() => CategorySpecificationUniqValue, csv => csv.specification)
    categorySpecifications!: CategorySpecificationUniqValue[];

    @OneToMany(() => ProductSpecificationValue, psv => psv.specification)
    productValues!: ProductSpecificationValue[];

}