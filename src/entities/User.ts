import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn
} from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    //??
    @Column({
        name: 'firstName',
        type: 'varchar',
        length: 45,
        nullable: false
    })
    firstName!: string;

    @Column({
        name: 'lastName',
        type: 'varchar',
        length: 45,
        nullable: false
    })
    lastName!: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 45,
        unique: true,
        nullable: false
    })
    email!: string;

    @Column({
        name: "birthDate",
        type: "date",
        nullable: true
    })
    birthDate!: Date;

    @Column({
        type: "enum",
        enum: ["guest", "user", "admin"],
        default: "user"
    })
    role!: "guest" | "user" | "admin";

    @Column({
        name: 'password',
        type: 'varchar',
        select: false,
        nullable: false,
    })
    password!: string;

    @Column({
        name: 'phone',
        type: 'varchar',
        length: 14,
        unique: true,
        nullable: false
    })
    phone!: string;

    //??
    // @Column({
    //     name: "img",
    //     type: "varchar",
    //     length: 255,
    //     unique: true,
    //     nullable: true
    // })
    // img!: string;

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
