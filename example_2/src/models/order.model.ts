import {Entity, hasMany, model, property} from '@loopback/repository';
import {Orderdetail} from './orderdetail.model';
import {Product} from './product.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userid: number;

  @property({
    type: 'date',
    required: true,
  })
  createat: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'number',
    defaultFn: 'now',
  })
  customerId?: number;

  @hasMany(() => Product, {through: {model: () => Orderdetail}})
  products: Product[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
