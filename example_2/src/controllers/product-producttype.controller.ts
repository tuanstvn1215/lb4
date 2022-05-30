import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Product, Producttype} from '../models';
import {ProductRepository} from '../repositories';

export class ProductProducttypeController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  @get('/products/{id}/producttype', {
    responses: {
      '200': {
        description: 'Producttype belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producttype)},
          },
        },
      },
    },
  })
  async getProducttype(
    @param.path.number('id') id: typeof Product.prototype.id,
  ): Promise<Producttype> {
    return this.productRepository.producttype(id);
  }
}
