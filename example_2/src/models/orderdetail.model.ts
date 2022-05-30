import {Entity, model, property} from '@loopback/repository';

@model()
export class Orderdetail extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  qty: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  orderId?: number;

  @property({
    type: 'number',
  })
  productId?: number;

  constructor(data?: Partial<Orderdetail>) {
    super(data);
  }
}

export interface OrderdetailRelations {
  // describe navigational properties here
}

export type OrderdetailWithRelations = Orderdetail & OrderdetailRelations;
