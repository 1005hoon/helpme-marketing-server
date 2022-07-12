import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONNECTION } from 'src/utils/constant';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, DB_CONNECTION.MKT_DB)
    private readonly user: Model<UserDocument>,
  ) {}
}
