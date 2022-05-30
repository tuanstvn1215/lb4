import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Product, ProductRelations, Producttype} from '../models';
import {ProducttypeRepository} from './producttype.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly producttype: BelongsToAccessor<Producttype, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProducttypeRepository') protected producttypeRepositoryGetter: Getter<ProducttypeRepository>,
  ) {
    super(Product, dataSource);
    this.producttype = this.createBelongsToAccessorFor('producttype', producttypeRepositoryGetter,);
    this.registerInclusionResolver('producttype', this.producttype.inclusionResolver);
  }
}
