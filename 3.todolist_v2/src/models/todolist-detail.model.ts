import {Entity, hasMany, model, property} from '@loopback/repository';
import {Todo} from './todo.model';
import {Todolist} from './todolist.model';

@model()
export class TodolistDetail extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => Todo)
  todoId: number;
  @hasMany(() => Todolist)
  todoListId: number;
  constructor(data?: Partial<TodolistDetail>) {
    super(data);
  }
}

export interface TodolistDetailRelations {
  // describe navigational properties here
}

export type TodolistDetailWithRelations = TodolistDetail &
  TodolistDetailRelations;
