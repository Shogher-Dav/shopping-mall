import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' }) 
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15 })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 8, unique: true })
  sku: string;

  @Column({ type: 'numeric' })
  price: number;

  @ManyToOne(() => Category,(category) => {category.products})
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
