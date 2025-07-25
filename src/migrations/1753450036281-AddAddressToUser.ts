import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAddressToUser1753450036281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "address",
            type: "varchar",
            length: "255",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "address");
    }

}
