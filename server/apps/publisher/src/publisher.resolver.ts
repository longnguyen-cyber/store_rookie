import { Query, Resolver } from '@nestjs/graphql';
import { PublisherService } from './publisher.service';
import { Publisher } from '@app/common/@generated/publisher/publisher.model';

@Resolver()
export class PublisherResolver {
  constructor(private readonly publisherService: PublisherService) {}

  @Query(() => [Publisher])
  async publishers() {
    return await this.publisherService.findAll();
  }
}
