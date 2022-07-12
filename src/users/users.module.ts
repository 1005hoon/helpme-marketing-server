import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from 'src/utils/constant';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      DB_CONNECTION.MKT_DB,
    ),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
