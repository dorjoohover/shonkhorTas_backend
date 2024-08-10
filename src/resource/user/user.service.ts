import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserType } from '../../utils/enum';
import { User, UserDocument } from '../../schema';
import { PointHistory, UpdateUserDto } from './user.dto';

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
  async updatePointHistory(id: string, body: PointHistory, point: number) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await this.model.findByIdAndUpdate(id, {
        $push: {
          pointHistory: body
        }, 
        point: point
      })
    } else {
      return await this.model.findOne({ email: id });
    }
  }

  async getUserByEmailOrPhone(email: string) {
    try {
      const res = await this.model.findOne({ email: email });

      return res;
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }

  async editUser(user: UserDocument, dto: UpdateUserDto) {
    
    try {
 
      return await this.model.findByIdAndUpdate(user['_id'], {
        phone: dto.phone ?? user.phone,
        userType: dto.userType ?? user.userType,
        birthday: dto.birthday ?? user.birthday,
        profileImg: dto.profileImg ?? user.profileImg,
        status: dto.status,
        agentAddition:
          dto.userType == UserType.agent ? dto.agentAddition : null,
        organizationAddition:
          dto.userType == UserType.organization
            ? dto.organizationAddition
            : null,
      });
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }
}
