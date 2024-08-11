import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserStatus, UserType } from '../../utils/enum';

export class UserDto {
  @ApiProperty()
  username?: string;
  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;
  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty({ enum: UserType, default: UserType.default })
  userType?: UserType;
  @ApiProperty({ enum: UserStatus, default: UserStatus.active })
  status?: UserStatus;

  @ApiProperty()
  profileImg?: string;
}
