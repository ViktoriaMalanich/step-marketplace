import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User"; 

@Entity("payment_methods")
export class PaymentMethod {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "int", unsigned: true })
  user_id!: number;

  @ManyToOne(() => User, (user) => user.paymentMethods, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "varchar", nullable: false })
  stripe_payment_method_id!: string;

  @Column({ type: "varchar", nullable: true })
  brand!: string | null;

  @Column({ type: "varchar", length: 4, nullable: true })
  last4!: string | null;

  @Column({ type: "int", nullable: true })
  exp_month!: number | null;

  @Column({ type: "int", nullable: true })
  exp_year!: number | null;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
