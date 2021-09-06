import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(
    username: string,
    includePassword?: boolean,
  ): Promise<User | undefined> {
    return this.userModel
      .findOne({ username }, includePassword && 'passwordHash')
      .exec();
  }
}
