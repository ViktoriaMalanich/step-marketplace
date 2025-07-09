import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PaymentMethods1751909652378 implements MigrationInterface {
    private readonly tableName = "payment_methods";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment_methods",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int",
                        unsigned: true,
                    },
                    {
                        name: "stripe_payment_method_id",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "brand",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "last4",
                        type: "varchar",
                        length: "4",
                        isNullable: true,
                    },
                    {
                        name: "exp_month",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "exp_year",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_methods");
    }

}
