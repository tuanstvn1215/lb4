import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Todolist,TodolistWithRelations} from './todolist.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  desc: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isComplete: boolean;

  @belongsTo(() => Todolist)
  todolistId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  todos?: TodoWithRelations[];
}

export type TodoWithRelations = Todo & TodoRelations;
