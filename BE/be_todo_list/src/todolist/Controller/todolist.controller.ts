import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodolistService } from '../todolist.service';
// import { todoListModal } from './todolist.model';
import { ApiBody } from '@nestjs/swagger';
import { TodoListEntity } from '../Entity/todolist.entity';
import {
  CreateTodoDTO,
  ReScheduleCalenderDTO,
  ScheduleCalenderDTO,
} from '../DTO/todolist.dto';

@Controller('todolist')
@Injectable()
export class TodolistController {
  constructor(private readonly todoListService: TodolistService) {}

  @Post('createTodoItem')
  @ApiBody({ type: CreateTodoDTO })
  async createTodo(
    @Body() createTodoDTO: CreateTodoDTO,
  ): Promise<TodoListEntity[]> {
    return await this.todoListService.createTodoList(createTodoDTO);
  }

  @Get('getTodoItem')
  async getAllTodoList(): Promise<TodoListEntity[]> {
    return await this.todoListService.getAllTodoList();
  }

  @Post('getScheduleCalender')
  @ApiBody({ type: ScheduleCalenderDTO })
  async scheduleCalender(
    @Body() scheduleCalenderDTO: ScheduleCalenderDTO,
  ): Promise<TodoListEntity[]> {
    return await this.todoListService.scheduleCalender(scheduleCalenderDTO);
  }

  @Delete('RemoveItemById/:id')
  async deleteTodoItem(@Param('id') id: number): Promise<void> {
    await this.todoListService.deleteTodoItem(id);
  }

  @Put('rescheduleCalendar/:id')
  async reScheduleCalender(
    @Param('id') id: number,
    @Body() ReScheduleCalenderDTO: ReScheduleCalenderDTO,
  ): Promise<TodoListEntity[]> {
    return await this.todoListService.reScheduleCalender(
      id,
      ReScheduleCalenderDTO,
    );
  }
}
