import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' }) 
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
 
