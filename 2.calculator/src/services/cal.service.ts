import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import {Result} from '../models';
import {ResultRepository} from '../repositories';
@injectable({scope: BindingScope.TRANSIENT})
export class CalService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  async sum(num1: number, num2: number): Promise<number> {
    let result = num1 + num2;
    
    return result;
  }
}
