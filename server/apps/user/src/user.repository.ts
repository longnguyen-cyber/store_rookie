import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async createUser(data: any) {
    const user = await this.prisma.user.create({
      data: data,
    });
    return user;
  }
}
