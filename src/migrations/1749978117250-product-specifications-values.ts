import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProductSpecificationsValues1749978117250 implements MigrationInterface {
    private readonly tableName = "product_specifications_values";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        unsigned: true
                    },
                    {
                        name: "productId",
                        type: "int",
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: "specId",
                        type: "int",
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: "value",
                        type: "text",
                        isNullable: true,
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
                    },
                ],
            }),
            true
        );


        await queryRunner.createForeignKeys(this.tableName, [
            new TableForeignKey({
                columnNames: ["specId"],
                referencedTableName: "specification",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }),
            new TableForeignKey({
                columnNames: ["productId"],
                referencedTableName: "product",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.tableName);
        if (table) {
            for (const fk of table.foreignKeys) {
                await queryRunner.dropForeignKey(this.tableName, fk);
            }
        }
        await queryRunner.dropTable(this.tableName);
    }

}
