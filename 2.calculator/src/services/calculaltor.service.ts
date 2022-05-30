import {injectable, inject, BindingScope, Provider} from '@loopback/core';
import {CalculatorDataSource} from '../datasources';
import {getService} from '@loopback/service-proxy';
/*
 * Fix the service type. Possible options can be:
 * - import {Calculaltor} from 'your-module';
 * - export type Calculaltor = string;
 * - export interface Calculaltor {}
 */
export type Calculaltor = unknown;
export interface CalculatorService {
  // this is where you define the Node.js methods that will be
  // mapped to the SOAP operations as stated in the datasource
  // json file.
}
@injectable({scope: BindingScope.TRANSIENT})
export class CalculaltorProvider implements Provider<Calculaltor> {
  constructor(
    @inject('datasources.calculator')
    protected dataSource: CalculatorDataSource = new CalculatorDataSource() /* Add @inject to inject parameters */,
  ) {}

  value(): Promise<CalculatorService> {
    return getService(this.dataSource);
  }
}
