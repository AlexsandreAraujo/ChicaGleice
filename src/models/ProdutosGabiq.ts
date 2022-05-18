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
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    product_id: number;

    @Column()
    category: string;

    @Column()
    name: string;

    @Column()
    available: boolean;

    @Column()
    image_url: string;

    @Column()
    option0: string;

    @Column()
    option1: string;

    @Column()
    option2: string;

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
