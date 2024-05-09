import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // get all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // create new product
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // update given product
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.productService.update(id, updateProductDto);
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // delete given product
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      const result = await this.productService.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
