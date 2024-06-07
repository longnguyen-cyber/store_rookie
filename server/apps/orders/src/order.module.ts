import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { CommonModule, PrismaModule } from '@app/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderRepository } from './order.repository';
import { OrderResolver } from './order.resolver';
import { CacheModule } from '@app/cache';
import { AuthModule } from 'apps/auth/src/auth.module';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'lodash';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register(),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: config.get('MAIL_TRANSPORT'),
        transport: {
          tls: {
            rejectUnauthorized: false,
          },
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },

        defaults: {
          from: `"No Reply" <${config.get('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, '../../../libs/common/src/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    BullModule.registerQueue({
      name: 'queue',
    }),
  ],
  controllers: [],
  providers: [OrderService, OrderRepository, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
