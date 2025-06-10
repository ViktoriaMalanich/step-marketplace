import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProduct1748197563180 implements MigrationInterface {
    private readonly tableName = "product";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создаем таблицу product
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
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "img",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "price",
                        type: "int",
                        unsigned: true,                       
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["IN STOKE", "ORDER", "OUT"],
                        isNullable: true,
                    },
                    {
                        name: "marketId",
                        type: "int",
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: "categoryId",
                        type: "int",
                        unsigned: true,
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["marketId"],
                referencedTableName: "market",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["categoryId"],
                referencedTableName: "category",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //спросить
        const table = await queryRunner.getTable(this.tableName);
        if (table) {
            const foreignKeyMarket = table.foreignKeys.find(fk => fk.columnNames.indexOf("marketId") !== -1);
            if (foreignKeyMarket) {
                await queryRunner.dropForeignKey(this.tableName, foreignKeyMarket);
            }

            const foreignKeyCategory = table.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
            if (foreignKeyCategory) {
                await queryRunner.dropForeignKey(this.tableName, foreignKeyCategory);
            }
        }
        await queryRunner.dropTable(this.tableName);
    }
}
