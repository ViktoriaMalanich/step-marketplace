import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePaymentTable1751720537224 implements MigrationInterface {

    private readonly tableName = "payment";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "userId",
                        type: "int",
                        unsigned: true,
                        isPrimary: true,
                        isNullable: false,
                        generationStrategy: undefined,
                    },
                    {
                        name: "stripeId",
                        type: "varchar",
                        length: "45",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "created",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "invoice_prefix",
                        type: "varchar",
                        length: "10",
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                name: "fk_payment_userId",
                columnNames: ["userId"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(this.tableName, "fk_payment_userId");
        await queryRunner.dropTable(this.tableName);
    }
}
