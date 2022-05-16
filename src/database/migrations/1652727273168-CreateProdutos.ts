import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProdutos1652727273168 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produtos_gabiq',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generatedIdentity: 'ALWAYS',
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                    },
                    {
                        name: 'tamanho',
                        type: 'varchar',
                    },
                    {
                        name: 'cor',
                        type: 'varchar',
                    },
                    {
                        name: 'preco',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'stock',
                        type: 'int',
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
