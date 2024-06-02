import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSPA() {
    const spa = this.prismaService.staticPage.findFirst();
    return spa;
  }
}
