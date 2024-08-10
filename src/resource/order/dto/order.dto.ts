import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
    @ApiProperty()

    user: string
}