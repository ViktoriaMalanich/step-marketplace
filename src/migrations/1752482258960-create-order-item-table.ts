import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderItemTable1752482258960 implements MigrationInterface {

    private readonly tableName = "order_item";

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
                    name: "orderId",
                    type: "int",
                    isNullable: false,
                    unsigned: true
                },
                {
                    name: "productId",
                    type: "int",
                    isNullable: true,
                    unsigned: true
                },
                {
                    name: "quantity",
                    type: "int",
                    isNullable: false,
                    default: "1",
                    unsigned: true
                },
                {
                    name: "price",
                    type: "int",
                    isNullable: true,
                    unsigned: true
                }
            ]
        });

        await queryRunner.createTable(table);
        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: "FK_orderItem_orderId_order_id",
            columnNames: ["orderId"],
            referencedTableName: "order",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: "FK_orderItem_productId_product_id",
            columnNames: ["productId"],
            referencedTableName: "product",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
