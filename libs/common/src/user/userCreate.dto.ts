/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'

export class UserCreateDto {
  @ApiProperty({
    example: 'name',
    description: 'Name of the student',
  })
  @IsNotEmpty()
  readonly student_name: string

  @ApiProperty({
    example: '20007984',
    description: 'Code of the student',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly code: number

  @ApiProperty({
    example: '111111',
    description: 'Password of the student',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string
}
