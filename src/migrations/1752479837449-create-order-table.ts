import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderTable1752479837449 implements MigrationInterface {

    private readonly tableName = "order";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: this.tableName,
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isNullable: false,
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: "userId",
                    type: "int",                    
                    isNullable: true,
                    unsigned: true,
                },
                {
                    name: "amount",
                    type: "int",
                    isNullable: true,
                    unsigned: true,
                },
                {
                    name: "paymentStatus",
                    type: "enum",
                    enum: ["NONE", "UNPAID", "PAID", "PENDING", "FAILED", "REFUNDED"],
                    isNullable: false,
                    default: `'NONE'`
                },
                {
                    name: "deliveryStatus",
                    type: "enum",
                    enum: ["NONE", "PROCESSING", "IN_TRANSIT", "DELIVERED", "COMPLETED"],
                    isNullable: false,
                    default: `'NONE'`
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: true
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
                    isNullable: true
                }
            ]
        });
        await queryRunner.createTable(table);

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: "FK_order_userId_user_id",
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }));
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
