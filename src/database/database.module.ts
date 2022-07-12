import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CORP_REG_DB, MKT_DB, MKT_DB_DEV } from 'src/utils/constant';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: MKT_DB,
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(MKT_DB),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: MKT_DB_DEV,
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(MKT_DB_DEV),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: CORP_REG_DB,
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(CORP_REG_DB),
      }),
    }),
  ],
})
export class DatabaseModule {}
