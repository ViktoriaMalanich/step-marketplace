import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";


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

    @Column({ name: "measurement",
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
}