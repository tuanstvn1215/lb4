import {Entity, model, property} from '@loopback/repository';

@model()
export class Customerinfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  address?: string;


  constructor(data?: Partial<Customerinfo>) {
    super(data);
  }
}

export interface CustomerinfoRelations {
  // describe navigational properties here
}

export type CustomerinfoWithRelations = Customerinfo & CustomerinfoRelations;
