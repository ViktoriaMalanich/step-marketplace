import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("category_spec_uniq_value")
@Unique(["category", "specification"])
export class CategorySpecificationUniqValue {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @ManyToOne(() => Category, category => category.categorySpecifications,
        {
            onDelete: "CASCADE",
        })
    @JoinColumn({ name: "categoryId" })
    category!: Category;

    @ManyToOne(() => Specification, specification => specification.categorySpecifications,
        {
            onDelete: "CASCADE",
        })
    @JoinColumn({ name: "specId" }) // <- указываем реальное имя столбца
    specification!: Specification;

    @Column("json", { nullable: true })
    uniqValue!: any[]; // или any[] если могут быть другие типы


    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}