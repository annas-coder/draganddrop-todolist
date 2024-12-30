import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntity } from './Entity/todolist.entity';
import { TodolistController } from './Controller/todolist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListEntity])],
  controllers: [TodolistController],
  providers: [TodolistService],
  exports: [],
})
export class TodolistModule {}
