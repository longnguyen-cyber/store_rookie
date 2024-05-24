import { HttpStatus } from '@nestjs/common';

export type ResponseCustom = {
  status: HttpStatus;
  message: string;
  errors?: any;
  data?: any;
};
