import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CalculatorDataSource} from '../datasources';
import {Result, ResultRelations} from '../models';

export class ResultRepository extends DefaultCrudRepository<
  Result,
  typeof Result.prototype.id,
  ResultRelations
> {
  constructor(
    @inject('datasources.calculator') dataSource: CalculatorDataSource,
  ) {
    super(Result, dataSource);
  }
}
