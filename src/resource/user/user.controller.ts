import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../schema';
import { FeedbackDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../../guard/auth.guard';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    @InjectModel(User.name) private model: Model<UserDocument>,
  ) {}

  @Get()
  getAllUser() {
    return this.service.getAllUsers();
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('me')
  async getUserByEmail(@Request() { user }) {
    try {
      if (user == null) throw new HttpException('user null', 400);
      let res = await this.model
        .findById(user._id)
        .populate('pointHistory.sender', 'id username phone email', this.model)
        .populate(
          'pointHistory.receiver',
          'id username phone email',
          this.model,
        );

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('get/:id')
  @ApiParam({ name: 'id' })
  async getUserById(@Param('id') id: string) {
    return this.service.getUserById(id);
  }

  @Get('update/:id/:status/:message')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'status' })
  @ApiQuery({ name: 'message' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  async updateUser(
    @Request() { user },
    @Param('id') id,
    @Param('status') status,
    @Query('message') message,
  ) {
    try {
      if (user.userType == 'admin' || user.userType == 'system') {
        let client = await this.model.findByIdAndUpdate(id, {
          message: message,
          status: status,
        });

        if (!client) return false;
        return true;
      }
      return false;
    } catch (error) {
      throw new HttpException('error', 500);
    }
  }

  



  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Put()
  async editUser(@Request() { user }, @Body() dto: UpdateUserDto) {
    if (!user) throw new HttpException('user not found', 400);
    // dto.socials = JSON.parse(dto.socials);

    // if (dto.agentAddition) {
    //   let agent = dto.agentAddition.trim();
    //   dto.agentAddition = JSON.parse(agent);
    // }
    // if (dto.organizationAddition) {
    //   let org = dto.organizationAddition.trim();
    //   dto.organizationAddition = JSON.parse(dto.organizationAddition);
    // }
    return this.service.editUser(user, dto);
  }
  @Delete()
  async delete() {
    try {
      await this.model.deleteMany();
      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id' })
  @Patch('bookmark/:id')
  async bookmark(@Request() { user }: { user: User }, @Param('id') id: number) {
    try {
      const body = user.bookmarks.includes(id)
        ? {
            $pull: {
              bookmarks: id,
            },
          }
        : {
            $push: {
              bookmarks: id,
            },
          };
      return this.model.findByIdAndUpdate(user['_id'], body);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
