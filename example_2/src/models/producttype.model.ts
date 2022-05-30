import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class Producttype extends Entity {
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

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Producttype>) {
    super(data);
  }
}

export interface ProducttypeRelations {
  // describe navigational properties here
}

export type ProducttypeWithRelations = Producttype & ProducttypeRelations;
