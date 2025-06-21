import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddUniqueAndCascadeToCategorySpecUniqValue1750284488199 implements MigrationInterface {
    private readonly tableName = "category_spec_uniq_value";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.tableName);
        if (!table) throw new Error("Table not found");

        const oldFks = table.foreignKeys.filter(fk =>
            ["specId", "categoryId"].includes(fk.columnNames[0])
        );
        if (oldFks.length > 0) {
            await queryRunner.dropForeignKeys(this.tableName, oldFks);
        }

        // Создаём FK с каскадным удалением
        await queryRunner.createForeignKeys(this.tableName, [
            new TableForeignKey({
                columnNames: ["specId"],
                referencedTableName: "specification",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }),
            new TableForeignKey({
                columnNames: ["categoryId"],
                referencedTableName: "category",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        ]);

        // Добавляем уникальный индекс на пару (categoryId, specId)
        await queryRunner.query(`
            ALTER TABLE \`${this.tableName}\`
            ADD UNIQUE KEY \`UQ_category_spec_pair\` (\`categoryId\`, \`specId\`);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем уникальный индекс
        await queryRunner.query(`
            ALTER TABLE \`${this.tableName}\`
            DROP INDEX \`UQ_category_spec_pair\`;
        `);

        // Удаляем внешние ключи
        const table = await queryRunner.getTable(this.tableName);
        if (!table) throw new Error("Table not found");

        const fks = table.foreignKeys.filter(fk =>
            ["specId", "categoryId"].includes(fk.columnNames[0])
        );
        if (fks.length > 0) {
            await queryRunner.dropForeignKeys(this.tableName, fks);
        }

        // (необязательно) можешь вернуть FK без CASCADE, если нужно
    }

}
