import { Injectable } from '@nestjs/common';
import { ProcessRepository } from './process.repository';

@Injectable()
export class ProcessService {
  constructor(private readonly processRepository: ProcessRepository) {}

  async findAll() {
    return await this.processRepository.findAll();
  }

  async findOne(id: string) {
    return await this.processRepository.findOne(id);
  }

  async create(data: any) {
    return await this.processRepository.create(data);
  }

  async update(id: string, data: any) {
    return await this.processRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.processRepository.delete(id);
  }
}
