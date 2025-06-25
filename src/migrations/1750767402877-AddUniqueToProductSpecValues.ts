import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AddUniqueToProductSpecValues1750767402877 implements MigrationInterface {
    private readonly tableName = "product_specifications_values";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex("product_specifications_values", new TableIndex({
            name: "IDX_product_specification_unique",
            columnNames: ["productId", "specId"],
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("product_specifications_values", "IDX_product_specification_unique");
    }

}
