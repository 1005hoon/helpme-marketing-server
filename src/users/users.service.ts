import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONNECTION } from 'src/utils/constant';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, DB_CONNECTION.MKT_DB)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException(
        `이메일에 해당하는 사용자가 존재하지 않습니다 ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async create(userData: CreateUserDto) {
    return this.userModel.create({ ...userData });
  }
}
