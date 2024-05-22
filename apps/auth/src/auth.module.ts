import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'apps/user/src/user.module';
import { AuthService } from './auth.service';
import { PrismaModule, CommonModule, LoggerService } from '@app/common';
import { SecurityMiddleware } from '@app/common/middleware/security.middleware';
@Module({
  providers: [AuthService, LoggerService],
  imports: [
    PrismaModule,
    CommonModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
