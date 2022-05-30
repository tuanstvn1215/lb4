import {Entity, model, property} from '@loopback/repository';

@model()
export class Result extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  result: string;

  @property({
    type: 'number',
    required: true,
  })
  num1: number;

  @property({
    type: 'number',
    required: true,
  })
  num2: number;

  @property({
    type: 'date',
    required: true,
  })
  createAt: Date;

  constructor(data?: Partial<Result>) {
    super(data);
  }
}

export interface ResultRelations {
  // describe navigational properties here
}

export type ResultWithRelations = Result & ResultRelations;
