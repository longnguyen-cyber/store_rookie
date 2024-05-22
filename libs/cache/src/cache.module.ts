import {
  CACHE_MANAGER,
  CacheModule as NestCacheModule,
} from '@nestjs/cache-manager';
import { DynamicModule, Module } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
export const CACHE_SERVICE = 'CACHE_SERVICE';

@Module({})
export class CacheModule {
  static register(ttl?: number): DynamicModule {
    return {
      module: CacheModule,
      imports: [
        NestCacheModule.registerAsync({
          useFactory: () => ({
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            no_ready_check: true,
            ttl,
          }),
        }),
      ],
      providers: [
        {
          provide: CACHE_SERVICE,
          inject: [CACHE_MANAGER],
          useFactory: (cacheManager: Cache) => cacheManager,
        },
      ],
      exports: [CACHE_SERVICE],
    };
  }
}
