import { PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PublisherRepository } from './publisher.repository';
import { PublisherResolver } from './publisher.resolver';
import { PublisherService } from './publisher.service';

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
  providers: [PublisherService, PublisherRepository, PublisherResolver],
  exports: [PublisherService],
})
export class PublisherModule {}
