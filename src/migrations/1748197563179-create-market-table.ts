import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMarket1748197563179 implements MigrationInterface {

    private readonly tableName = "market";

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
                    name: "name",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "logo",
                    type: "varchar",
                    isUnique: true,
                    isNullable: true
                },
                {
                    name: "isActive",
                    type: "boolean",
                    isNullable: false
                },
                {
                    name: "phones",
                    type: "json",
                    isNullable: false
                },
                {
                    name: "emails",
                    type: "json",
                    isNullable: false
                },
                {
                    name: "address",
                    type: "text",
                    isNullable: false
                },
                {
                    name: 'ownerId',
                    type: "int",
                    unsigned: true,
                    isNullable: false
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

        await queryRunner.createForeignKey("market", new TableForeignKey({
            name: "FK_market_ownerId_user_id",
            columnNames: ["ownerId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}

