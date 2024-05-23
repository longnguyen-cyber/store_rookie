import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './books.service';
import { Book } from '@app/common/@generated/book/book.model';
import { QUERY_ORDER } from '@app/common';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books() {
    return await this.bookService.findAll();
  }

  @Query(() => [Book])
  async recommendBooks() {
    return await this.bookService.getRecommendBooks();
  }

  @Query(() => [Book])
  async popularBooks() {
    return await this.bookService.getBookPopular();
  }

  @Query(() => [Book])
  async booksByCategory(@Args('category_id') category_id: string) {
    return await this.bookService.getBookByCategory(category_id);
  }

  @Query(() => [Book])
  async booksByAuthor(@Args('author_id') author_id: string) {
    return await this.bookService.getBookByAuthor(author_id);
  }

  @Query(() => [Book])
  async booksByRating(@Args('star') star: string) {
    return await this.bookService.getBookByRating(parseInt(star));
  }

  @Query(() => [Book])
  async booksByPrice(@Args('type') type: string) {
    return await this.bookService.getBookByPrice(type as QUERY_ORDER);
  }
}
