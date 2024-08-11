import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Model } from 'mongoose';
import appConfig from '../../config/app.config';
import { UserStatus } from '../../utils/enum';
import { User, UserDocument } from '../../schema/user.schema';
import { LoginUser } from './auth.dto';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    @InjectModel(User.name) private model: Model<UserDocument>,
  ) {}

  // async sendConfirmMail(email: string, code: string) {
  //   await this.mailservice
  //     .sendMail({
  //       to: email,
  //       subject: 'Please confirm your account',
  //       html: `<h1>Email Confirmation</h1>

  //               <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
  //               <a href=https://eunitbackend-production.up.railway.app/auth/confirm/${code}> Click here</a>
  //               </div>`,
  //     })
  //     .catch((err) => console.log(err));
  // }

  // async sendForgetPasswordMail(email: string, code: string) {
  //   await this.mailservice
  //     .sendMail({
  //       to: email,
  //       subject: 'Please confirm your account',
  //       html: `<h1>Email Confirmation</h1>

  //               <p>Forgot password</p>
  //               <a href=https://eunitbackend-production.up.railway.app/auth/forget/password/${code}> Click here</a>
  //               </div>`,
  //     })
  //     .catch((err) => console.log(err));
  // }
  @Post('register')
  @ApiOperation({ description: 'hereglegch uusgeh' })
  async createUser(@Body() dto: UserDto) {
    return await this.service.register(dto);
  }

  @Post('login')
  @ApiOperation({ description: 'login hiih' })
  async login(@Body() dto: LoginUser) {
    const user = await this.service.login(dto);
    if (user.success) {
      const token = await this.service.signPayload(user.user.phone);

      return {
        success: true,
        id: token,
        message: 'Амжилттай нэвтэрлээ.',
        status: 201,
      };
    } else {
      return {
        success: false,
        status: 201,
        id: '',
        message: user.message,
      };
    }
  }

  @Get('forget')
  @ApiQuery({ name: 'email' })
  async forgetSendEmail(@Query('email') email: string) {
    let user = await this.model.findOne({ email });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    // await this.sendForgetPasswordMail(email, user.code);
    return true;
  }
  // @Get('forget/password/:code')
  // @ApiParam({ name: 'code' })
  // async forgetSendPassword(@Param('code') code: string, @Res() res) {
  //   let user = await this.model.findOne({ code });
  //   if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

  //   return res.redirect(
  //     `https://eunitbackend-production.up.railway.app/forget/${code}`,
  //   );
  // }

  // @Post('forget/:code')
  // @ApiParam({ name: 'code' })
  // async forgetEditPassword(
  //   @Param('code') code: string,
  //   @Body() dto: { password: string },
  // ) {
  //   let user = await this.model.findOne({ code });
  //   if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

  //   // const hashed = await bcrypt.hash(dto.password, 10);
  //   // user.password = hashed;
  //   user.save();
  //   return true;
  // }

  @Get('confirm/:code')
  @ApiParam({ name: 'code' })
  @ApiOperation({ description: 'confirm code awah ' })
  async confirmCode(@Param('code') code: string, @Res() res) {
    let user = await this.model.findOne({ code });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (user.status != UserStatus.active) {
      user.status = UserStatus.active;
      user.save();
    }
    return res.redirect(appConfig().link);
  }
}
