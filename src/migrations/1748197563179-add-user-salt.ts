import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserSalt1748197563179 implements MigrationInterface {

    private readonly tableName = "user";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(this.tableName, new TableColumn({
            name: "salt",        
            type: "varchar",  
            length: "32",             
            isNullable: true                
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(this.tableName, "salt");
    }

}
