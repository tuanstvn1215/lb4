import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class CalculatorService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
}
