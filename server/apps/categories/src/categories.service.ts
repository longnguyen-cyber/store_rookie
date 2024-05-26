import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    const categories = await this.categoriesRepository.findAll();
    console.log('data', categories);
    return categories;
  }

  async getBookByCategory(category: string) {
    const categories =
      await this.categoriesRepository.getBookByCategory(category);
    const books = categories.map((category) => category.books);
    return books.flat();
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne(id);
    return category;
  }

  async create(data: any) {
    const category = await this.categoriesRepository.create(data);
    return category;
  }

  async update(id: string, data: any) {
    const category = await this.categoriesRepository.update(id, data);
    return category;
  }

  async delete(id: string) {
    const category = await this.categoriesRepository.delete(id);
    return category;
  }
}
