import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private categoryRepo: Repository<Category>

  constructor(private connection: Connection){
    this.categoryRepo = this.connection.getRepository(Category);
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneOrFail(id);
    category.name = updateCategoryDto.name || category.name;

    category.description = updateCategoryDto.description || category.description;
    await this.categoryRepo.save(category);
    return category;
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
