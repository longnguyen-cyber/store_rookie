import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async findOne(id: string) {
    return await this.authorRepository.findOne(id);
  }

  async create(data: any) {
    return await this.authorRepository.create(data);
  }

  async update(id: string, data: any) {
    return await this.authorRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.authorRepository.delete(id);
  }

  async getBookByAuthor(author: string) {
    const books = await this.authorRepository.getBookByAuthor(author);

    return books.flat();
  }
}
