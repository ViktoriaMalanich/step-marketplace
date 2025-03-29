import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm";

export class CreateCategoryTable1743021680660 implements MigrationInterface {

    private readonly tableName = "category";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: this.tableName,
            columns: [
                {
                    name: "id",
                    type: "int",
                    generationStrategy: "increment",
                    isNullable: false,
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "100",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true,

                },
                {
                    name: "img",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                    isNullable: true
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
                {
                    name: "parentId",
                    type: "int",
                    isNullable: false,
                    unsigned: true
                }
            ]
        });
        await queryRunner.createTable(table);

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: "FK_parentId_to_id",
            columnNames: ["parentId"],
            referencedColumnNames: ["id"],
            referencedTableName: this.tableName,
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
