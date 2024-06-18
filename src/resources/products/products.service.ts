import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto){  
    const { sku } = createProductDto;
    const isExist = await this.productRepository.findOne({
      where: {
        sku
      }
    })
    if(isExist){
      throw new BadRequestException('Product already exist')
    }
    const newProduct1 = this.productRepository.create({
      ...createProductDto
    })
    return await this.productRepository.save(newProduct1);
  }
  async findAll(){
    return await this.productRepository.find({
      relations: {
        category: true
      }
    })
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
       category: true
      }
    });
    if(!product){
      throw new NotFoundException(`Product not found`)
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { sku } = updateProductDto;

    const product = await this.productRepository.findOne({
      where: [
        { id }
      ]
    });

    if(!product){
      throw new NotFoundException('Product not found');
    }

    const sameSkuProduct = await this.findProductWithSameSKU(id, sku);
 
    if(sameSkuProduct.length){
      throw new BadRequestException('Another product with this sku already exist, please check sku number')
    }
 
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: { id }
    });

    if(!product){
      throw new NotFoundException('Product not found');
    }
    return await this.productRepository.delete(id);
  }

  async findProductWithSameSKU(id:string, sku: string){
    const queryBuilder:
      SelectQueryBuilder<Product> = this.productRepository
      .createQueryBuilder('products');
  
      const sameSkuProduct = await queryBuilder
        .where('products.id != :id', { id })
        .andWhere('products.sku = :sku', { sku })
        .getMany();

      return sameSkuProduct;
  }

}
