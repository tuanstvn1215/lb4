import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producttype,
  Product,
} from '../models';
import {ProducttypeRepository} from '../repositories';

export class ProducttypeProductController {
  constructor(
    @repository(ProducttypeRepository) protected producttypeRepository: ProducttypeRepository,
  ) { }

  @get('/producttypes/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Producttype has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.producttypeRepository.products(id).find(filter);
  }

  @post('/producttypes/{id}/products', {
    responses: {
      '200': {
        description: 'Producttype model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producttype.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInProducttype',
            exclude: ['id'],
            optional: ['producttypeId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.producttypeRepository.products(id).create(product);
  }

  @patch('/producttypes/{id}/products', {
    responses: {
      '200': {
        description: 'Producttype.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.producttypeRepository.products(id).patch(product, where);
  }

  @del('/producttypes/{id}/products', {
    responses: {
      '200': {
        description: 'Producttype.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.producttypeRepository.products(id).delete(where);
  }
}
