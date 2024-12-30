import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDTO {
  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Buy groceries',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the todo item',
    example: 'Buy milk, eggs, and bread',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'create todo list based on date',
    example: new Date(),
  })
  @IsNotEmpty()
  @IsString()
  date: Date;
}

export class ScheduleCalenderDTO {
  @ApiProperty({
    description: 'Take the schedule list from start date',
    example: new Date(),
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'Take the schedule list from end date',
    example: new Date(new Date().setDate(new Date().getDate() + 5)),
  })
  @IsNotEmpty()
  endDate: Date;
}

export class ReScheduleCalenderDTO {
  @ApiProperty({
    description: 'Reschedule Calender',
    example: new Date(new Date().setDate(new Date().getDate() + 5)),
  })
  @IsNotEmpty()
  date: Date;
}
