import { Author } from '@app/common/@generated/author/author.model';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';

@Resolver()
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  async authors() {
    return await this.authorService.findAll();
  }
}
