import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from '../@generated/user/user.model';

@ObjectType()
export class ResUserDto extends User {
  @HideField()
  password: string;

  @Field()
  token: string;
}
