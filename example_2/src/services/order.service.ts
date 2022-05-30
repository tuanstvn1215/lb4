import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Order, repository} from '@loopback/repository';
import {Customer} from '../models';
import {CustomerRepository, OrderRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class OrderService {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
    @repository(CustomerRepository)
    protected customerRepository: CustomerRepository,
  ) /* Add @inject to inject parameters */ {}
  async createOrderIfLogin(order: Order) {
    return this.orderRepository.create(order);
  }
  async createOrderIfNotLogin(order: Order, customer: Customer) {
    return {
      customer: this.customerRepository.create(order),
      order: this.orderRepository.create(customer),
    };
  }

  /*
   * Add service methods here
   */
}
