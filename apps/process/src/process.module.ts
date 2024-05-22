import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { PrismaModule } from '@app/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProcessRepository } from './process.repository';
import { ProcessResolver } from './process.resolver';

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
  providers: [ProcessService, ProcessRepository, ProcessResolver],
  exports: [ProcessService],
})
export class ProcessModule {}
