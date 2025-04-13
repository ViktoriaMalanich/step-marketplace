import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm";

export class CreateUserTable1743679666483 implements MigrationInterface {

    private readonly tableName = "user";

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
                    name: 'firstName',
                    type: 'varchar',
                    length: "45",
                    isNullable: false
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    length: "45",
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: "45",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    //select: false,
                    isNullable: false,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: "14",
                    isUnique: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise < void> {
        await queryRunner.dropTable(this.tableName);
        }

}
