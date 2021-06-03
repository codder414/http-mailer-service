import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { EMailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './email/env.validation';

const ConfigModuleInstance = ConfigModule.forRoot({ validate });

const MongooseModuleInstance = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URL'),
    useNewUrlParser: true,
    dbName: configService.get<string>('MONGODB_DBNAME'),
  }),
  inject: [ConfigService],
});

const BullModuleInstance = BullModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      db: configService.get<number>('REDIS_DB'),
    },
  }),
  inject: [ConfigService],
});
@Global()
@Module({
  imports: [
    ConfigModuleInstance,
    MongooseModuleInstance,
    BullModuleInstance,
    EMailModule,
  ],
  exports: [ConfigModuleInstance, MongooseModuleInstance, BullModuleInstance],
})
export class AppModule {}
