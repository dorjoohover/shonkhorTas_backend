import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from '../../config/app.config';
import { UserStatus, UserType } from '../../utils/enum';
import { User, UserDocument } from '../../schema';
import { UserService } from '../user/user.service';
import { LoginUser } from './auth.dto';
import { UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private userService: UserService,
  ) {}
  async signPayload(payload: string) {
    return sign(payload, appConfig().appSecret);
  }

  async validateUser(payload: string) {
    let user = await this.model.findOne({ email: payload });
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }
  async register(dto: UserDto) {
    try {
      if (dto.phone != null && dto.password != null) {
        const hashed = await bcrypt.hash(dto.password, 10);
        let user = await this.userService.getUserByEmailOrPhone(dto.phone);
        console.log(hashed);
        if (user)
          throw new HttpException('registered user', HttpStatus.BAD_REQUEST);
        if (hashed) {
          const createdUser = await this.model.create({
            ...dto,
            password: hashed,
          });
          return {
            status: 201,
            id: createdUser.id,
            message: 'Амжилттай хэрэглэгч үүслээ.',
            success: true,
          };
        } else {
          return {
            status: 200,
            success: false,
            id: '',
            message: 'Дахин оролдоно уу.',
          };
        }
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  // async registerGoogle(dto: LoginUser) {
  //   try {
  //     return await this.model.create({
  //       username: dto.name,
  //       email: dto.email,
  //       profileImg: dto.profileImg,
  //       userType: UserType.default,
  //       status: UserStatus.active,
  //       point: 10000,
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  async login(dto: LoginUser) {
    try {
      let user = await this.model.findOne({ phone: dto.phone });

      if (!user)
        return { status: false, message: 'Бүртгэлгүй хэрэглэгч байна.' };
      let compare = await bcrypt.compare(dto.password, user.password);
      if (!compare) return { status: false, message: 'Нууц үг буруу байна.' };
      if (user.status == UserStatus.banned)
        return { success: false, message: 'Нэвтрэх боломжгүй хүн байна.' };
      return { success: true, user: user };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
