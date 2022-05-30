import {Entity, hasMany, model, property} from '@loopback/repository';
import {Todo} from './todo.model';
import {TodolistDetail} from './todolist-detail.model';

@model()
export class Todolist extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  id: number;
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: false,
  })
  desc: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isComplete: boolean;

  @hasMany(() => Todo, {
    through: {
      model: () => TodolistDetail,
      keyFrom: 'todoListId',
      keyTo: 'todoId',
    },
  })
  todos: Todo[];

  constructor(data?: Partial<Todolist>) {
    super(data);
  }
}

export interface TodolistRelations {
  // describe navigational properties here
}

export type TodolistWithRelations = Todolist & TodolistRelations;
