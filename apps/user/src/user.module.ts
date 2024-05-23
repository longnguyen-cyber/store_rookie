import { CacheModule } from '@app/cache';
import { CommonModule, LoggerService, PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from 'apps/auth/src/auth.module';
import { UserCheck } from './user.check';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

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
export class UserModule {}
