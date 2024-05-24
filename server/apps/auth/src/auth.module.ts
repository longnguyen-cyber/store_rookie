import { CommonModule, LoggerService, PrismaModule } from '@app/common';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'apps/user/src/user.module';
import { AuthService } from './auth.service';
@Module({
  providers: [AuthService, LoggerService],
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
