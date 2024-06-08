import { CommonModule, PrismaModule } from '@app/common';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'apps/user/src/user.module';
@Module({
  providers: [AuthService],
  imports: [
    PrismaModule,
    CommonModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
