import { QUERY_SORT } from '@app/common';
import { Book } from '@app/common/@generated/book/book.model';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './books.service';
import { BookResponseCustom } from '@app/common/book';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => BookResponseCustom)
  async books(
    @Args('skip', { type: () => String, nullable: true }) skip: string,
  ) {
    const books = await this.bookService.findAll(parseInt(skip));
    return books;
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
  @Query(() => BookResponseCustom)
  async booksByCategory(
    @Args('category_id') category_id: string,
    @Args('type') type: string,
    @Args('skip', { type: () => String, nullable: true }) skip: string,
  ) {
    return await this.bookService.getBookByCategory(
      category_id,
      type as QUERY_SORT,
      parseInt(skip),
    );
  }

  @Query(() => BookResponseCustom)
  async booksByAuthor(
    @Args('author_id') author_id: string,
    @Args('type') type: string,
    @Args('skip', { type: () => String, nullable: true }) skip: string,
  ) {
    const data = await this.bookService.getBookByAuthor(
      author_id,
      type as QUERY_SORT,
      parseInt(skip),
    );
    console.log('author_id', author_id);
    console.log('type', type);
    console.log('skip', skip);
    console.log('data', data);
    return data;
  }

  @Query(() => BookResponseCustom)
  async booksByRating(
    @Args('star') star: string,
    @Args('type') type: string,
    @Args('skip', { type: () => String, nullable: true }) skip: string,
  ) {
    return await this.bookService.getBookByRating(
      parseInt(star),
      type as QUERY_SORT,
      parseInt(skip),
    );
  }
}
