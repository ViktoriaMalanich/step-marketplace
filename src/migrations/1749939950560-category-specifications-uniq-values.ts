import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CategorySpecificationsUniqValues1749939950560 implements MigrationInterface {
    private readonly tableName = "category_spec_uniq_value";

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
                        name: "specId",
                        type: "int",
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: "categoryId",
                        type: "int",
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: "uniqValue",
                        type: "json",
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
                columnNames: ["categoryId"],
                referencedTableName: "category",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }),
        ]);

    };



    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
