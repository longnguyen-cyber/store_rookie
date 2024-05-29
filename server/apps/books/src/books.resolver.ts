import { QUERY_SORT } from '@app/common';
import { Book } from '@app/common/@generated/book/book.model';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './books.service';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books() {
    return await this.bookService.findAll();
  }

  @Query(() => Book)
  async book(@Args('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Query(() => [Book])
  async recommendBooks() {
    return await this.bookService.getRecommendBooks();
  }

  @Query(() => [Book])
  async popularBooks() {
    return await this.bookService.getBookPopular();
  }

  //shop page
  @Query(() => [Book])
  async booksByCategory(
    @Args('category_id') category_id: string,
    @Args('type') type: string,
  ) {
    return await this.bookService.getBookByCategory(
      category_id,
      type as QUERY_SORT,
    );
  }

  @Query(() => [Book])
  async booksByAuthor(
    @Args('author_id') author_id: string,
    @Args('type') type: string,
  ) {
    return await this.bookService.getBookByAuthor(
      author_id,
      type as QUERY_SORT,
    );
  }

  @Query(() => [Book])
  async booksByRating(@Args('star') star: string, @Args('type') type: string) {
    return await this.bookService.getBookByRating(
      parseInt(star),
      type as QUERY_SORT,
    );
  }
}
