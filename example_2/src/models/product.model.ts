import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producttype} from './producttype.model';

@model()
export class Product extends Entity {
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
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  dvt: string;
  test = {
    include: [
      {
        relation: 'producttype',
      },
    ],
  };
  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Producttype)
  producttypeId: number;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
