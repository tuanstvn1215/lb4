import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Order} from '../models';

export class OrderController {
  constructor() {}
  @post('/orderIfLogin')
  @response(200, {
    description: 'new order',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Order),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'Order',
            exclude: ['id'],
          }),
        },
      },
    })
    order: Omit<Order, 'id'>,
  ) {
    return;
  }
}
