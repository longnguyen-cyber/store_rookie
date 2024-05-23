import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findAll() {
    return await this.reviewRepository.findAll();
  }

  async findOne(id: string) {
    return await this.reviewRepository.findOne(id);
  }

  async create(data: any) {
    return await this.reviewRepository.create(data);
  }

  async update(id: string, data: any) {
    return await this.reviewRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.reviewRepository.delete(id);
  }

  async getAllReviewByBookId(bookId: string) {
    return await this.reviewRepository.getAllReviewByBookId(bookId);
  }
}
