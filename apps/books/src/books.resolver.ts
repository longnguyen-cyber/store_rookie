import { Query, Resolver } from '@nestjs/graphql';
import { BookService } from './books.service';
import { Book } from '@app/common/@generated/book/book.model';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books() {
    return await this.bookService.findAll();
  }
}
