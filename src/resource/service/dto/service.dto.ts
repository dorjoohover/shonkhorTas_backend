import { ApiProperty } from "@nestjs/swagger";

export class ServiceDto {
    @ApiProperty()

    user: string
}