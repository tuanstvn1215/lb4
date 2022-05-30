import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodolistDetail, TodolistDetailRelations} from '../models';

export class TodolistDetailRepository extends DefaultCrudRepository<
  TodolistDetail,
  typeof TodolistDetail.prototype.id,
  TodolistDetailRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TodolistDetail, dataSource);
  }
}
