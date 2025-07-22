import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateWishlist1753105646350 implements MigrationInterface {

    private readonly tableName = "wishlists";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: this.tableName,
            columns: [
                {
                    name: "userId",
                    type: "int",
                    isNullable: false,
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: "productId",
                    type: "int",
                    isNullable: false,
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false
                }
            ]
        });
        await queryRunner.createTable(table);

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: "FK_wishlist_userId_user_id",
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: "FK_wishlist_productId_product_id",
            columnNames: ["productId"],
            referencedTableName: "product",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
