import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { QUERY_SORT } from '../enums';

@InputType()
export class FilterBookDto {
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  rating?: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  author?: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  category?: string[];

  @Field(() => String, { nullable: true })
  @IsEnum(QUERY_SORT)
  @IsOptional()
  sortByEnum?: QUERY_SORT;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  skip?: number;
}
