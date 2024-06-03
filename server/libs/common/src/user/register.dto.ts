import { Field, InputType } from '@nestjs/graphql';
import { LoginInput } from './login.dto';

@InputType()
export class RegisterDTO extends LoginInput {
  @Field()
  username: string;
}
