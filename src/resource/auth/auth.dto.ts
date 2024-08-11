import { ApiProperty } from '@nestjs/swagger';
import { UserStatus, UserType } from 'src/utils/enum';

export class LoginUser {
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
}
