import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;
}
