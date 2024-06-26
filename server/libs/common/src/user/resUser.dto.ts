import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../@generated/user/user.model';

@ObjectType()
export class ResUserDto {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
