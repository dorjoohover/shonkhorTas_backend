import { ApiProperty } from "@nestjs/swagger";

export class ServiceDto {
    @ApiProperty()
    img: string
    @ApiProperty()
    text: string
    @ApiProperty()
    count: number
}