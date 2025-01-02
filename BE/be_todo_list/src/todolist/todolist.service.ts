import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoListEntity } from './Entity/todolist.entity';
import { CreateTodoDTO, ScheduleCalenderDTO } from './DTO/todolist.dto';

@Injectable()
export class TodolistService {
  private todo: TodoListEntity[] = [
    {
      id: 0,
      title: '',
      description: '',
      date: new Date(),
    },
  ];

  constructor(
    @InjectRepository(TodoListEntity)
    private readonly todoRepository: Repository<TodoListEntity>,
  ) {}

  async createTodoList(createTodoDTO: CreateTodoDTO): Promise<TodoListEntity[]> {
    debugger
    const createTodoList = this.todoRepository.create({
      title: createTodoDTO.title,
      description: createTodoDTO.description,
      date: new Date(createTodoDTO.date),
    });
    await this.todoRepository.save(createTodoList);
    return this.todoRepository.find();
  }

  async getAllTodoList(): Promise<TodoListEntity[]> {
    return await this.todoRepository.find({
      order: {
        date: 'ASC',
      },
    });
  }

  async deleteTodoItem(id: number): Promise<void> {
    try {
      const deleted = this.todoRepository.delete({ id });
      console.log(deleted);
    } catch (error) {
      console.error(`error ${error}`);
    }
  }

  async scheduleCalender(
    scheduleCalenderDTO: ScheduleCalenderDTO,
  ): Promise<TodoListEntity[]> {
    return this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.date BETWEEN :startDate AND :endDate', {
        startDate: scheduleCalenderDTO.startDate,
        endDate: scheduleCalenderDTO.endDate,
      })
      .orderBy('todo.date', 'DESC')
      .getMany();
  }

  async reScheduleCalender(
    id,
    ReScheduleCalenderDTO,
  ): Promise<TodoListEntity[]> {
    const isUpdated = await this.todoRepository.update(
      id,
      ReScheduleCalenderDTO,
    );
    if (isUpdated.affected > 0) {
      return this.todoRepository.find();
    }
    new Error('No records updated. Invalid ID or data.');
  }
}
