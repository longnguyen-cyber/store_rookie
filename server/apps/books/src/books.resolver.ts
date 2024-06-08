import { Book } from '@app/common/@generated/book/book.model';
import { BookResponseCustom, FilterBookDto } from '@app/common/book';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './books.service';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => Book)
  async book(@Args('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Query(() => [Book])
  async recommendBooks() {
    return await this.bookService.getRecommendBooks();
  }

  @Query(() => [Book])
  async searchByTitle(@Args('title') title: string) {
    return await this.bookService.searchByTitle(title);
  }

  @Query(() => [Book])
  async popularBooks() {
    return await this.bookService.getBookPopular();
  }

  //shop page
  @Query(() => BookResponseCustom)
  async booksFilter(@Args('filter', { nullable: true }) filter: FilterBookDto) {
    const data = await this.bookService.booksFilter(filter);
    return data;
  }
}
