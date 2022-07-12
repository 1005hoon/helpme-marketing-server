import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from 'src/utils/constant';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: DB_CONNECTION.CORP_REG_DB,
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(DB_CONNECTION.CORP_REG_DB),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: DB_CONNECTION.MKT_DB,
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(DB_CONNECTION.MKT_DB),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: DB_CONNECTION.MKT_DB_PROD,
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(DB_CONNECTION.MKT_DB_PROD),
      }),
    }),
  ],
})
export class DatabaseModule {}
