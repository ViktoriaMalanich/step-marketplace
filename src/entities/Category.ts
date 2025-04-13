import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn
} from "typeorm";

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
  
    @ManyToOne(() => Category, (category) => category.subcategory, { nullable: true })
    @JoinColumn({
        name: "parentId"
    })
    parentId!: Category | null;

    @OneToMany(()=> Category, category => category.parentId)
    subcategory!: Category[];
    
}
