import { CommonModule, LoggerService, PrismaModule } from '@app/common';
import { SecurityMiddleware } from '@app/common/middleware/security.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from 'apps/auth/src/auth.module';
import { UserCheck } from './user.check';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CacheModule } from '@app/cache';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    ConfigModule,
    CommonModule,
    forwardRef(() => CacheModule.register()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    LoggerService,
    UserCheck,
    UserResolver,
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
