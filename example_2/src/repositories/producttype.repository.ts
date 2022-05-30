import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Producttype, ProducttypeRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ProducttypeRepository extends DefaultCrudRepository<
  Producttype,
  typeof Producttype.prototype.id,
  ProducttypeRelations
> {
  public readonly products: HasManyRepositoryFactory<
    Product,
    typeof Producttype.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Producttype, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor(
      'products',
      productRepositoryGetter,
    );
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
