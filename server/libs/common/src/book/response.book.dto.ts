import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from '../@generated/book/book.model';

@ObjectType()
export class BookResponseCustom {
  @Field(() => [Book])
  books: Book[];

  @Field()
  total: number;
}
