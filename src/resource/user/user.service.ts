import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserType } from '../../utils/enum';
import { User, UserDocument } from '../../schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectModel(User.name) private adModel: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    let users = await this.model.find();
    if (!users) throw new ForbiddenException('not found');

    return users;
  }

  async getUserById(id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await this.model.findById(id);
    } else {
      return await this.model.findOne({ email: id });
    }
  }

  async getUserByEmailOrPhone(phone: string) {
    try {
      const res = await this.model.findOne({ phone: phone });

      return res;
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }

  async editUser(user: UserDocument, dto: UserDto) {
    try {
      return await this.model.findByIdAndUpdate(user['_id'], {
        ...dto,
      });
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }
}
