import { HttpStatus } from '@nestjs/common';

export type Response = {
  status: HttpStatus;
  message: string;
  errors?: any;
  data?: any;
};
