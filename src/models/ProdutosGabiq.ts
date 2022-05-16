import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('produtos_gabiq')
class ProdutosGabiq extends BaseEntity {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    product_id: number;

    @Column()
    name: string;

    @Column()
    available: boolean;

    @Column()
    image_url: string;

    @Column()
    tamanho: string;

    @Column()
    cor: string;

    @Column()
    preco: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default ProdutosGabiq;
