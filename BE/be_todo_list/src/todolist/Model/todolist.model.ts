import { ApiProperty } from '@nestjs/swagger';

export class todoListModal {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;
}
