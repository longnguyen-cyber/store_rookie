import { PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorRepository } from './author.repository';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [AuthorService, AuthorRepository, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
