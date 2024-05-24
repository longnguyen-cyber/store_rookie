import { Injectable } from '@nestjs/common';
import { PublisherRepository } from './publisher.repository';

@Injectable()
export class PublisherService {
  constructor(readonly publisherRepository: PublisherRepository) {}

  async findAll() {
    return await this.publisherRepository.findAll();
  }

  async findOne(id: string) {
    return await this.publisherRepository.findOne(id);
  }

  async create(data: any) {
    return await this.publisherRepository.create(data);
  }

  async update(id: string, data: any) {
    return await this.publisherRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.publisherRepository.delete(id);
  }
}
