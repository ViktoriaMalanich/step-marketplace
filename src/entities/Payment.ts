import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn
} from "typeorm";
import { User } from "./User";

@Entity({ name: "payment" })
export class Payment {
    @PrimaryColumn({ type: "int", unsigned: true })
    userId!: number;

    @Column({
        nullable: true, type: "varchar", length: 145,
    })
    name?: string | null;

    @Column({ type: "varchar", length: 45 })
    stripeId!: string;

    @Column({ type: "timestamp", nullable: false })
    created!: Date;

    @Column({
        nullable: true, type: "varchar", length: 45,
    })
    invoice_prefix!: string | null;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

}