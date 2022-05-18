import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProdutos1652727273168 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produtos_gabiq',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generatedIdentity: 'ALWAYS',
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'option0',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'option1',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'option2',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'preco',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'stock',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos_gabiq');
    }
}
