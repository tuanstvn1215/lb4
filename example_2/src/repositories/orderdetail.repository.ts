import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Orderdetail, OrderdetailRelations} from '../models';

export class OrderdetailRepository extends DefaultCrudRepository<
  Orderdetail,
  typeof Orderdetail.prototype.id,
  OrderdetailRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Orderdetail, dataSource);
  }
}
