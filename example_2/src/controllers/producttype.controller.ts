import {Filter, repository} from '@loopback/repository';
import {
  get,
  post,
  getModelSchemaRef,
  param,
  requestBody,
  response,
} from '@loopback/rest';
import {Producttype} from '../models';

import {ProducttypeRepository} from '../repositories';

export class ProducttypeController {
  constructor(
    @repository(ProducttypeRepository)
    public producttypeRepository: ProducttypeRepository,
  ) {}
  @get('/producttypes')
  @response(200, {
    description: 'product types',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Producttype, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Producttype) fillter?: Filter<Producttype>,
  ): Promise<Producttype[]> {
    return this.producttypeRepository.find(fillter);
  }
  @post('/producttype')
  @response(200, {
    description: 'product type',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Producttype),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producttype, {
            title: 'product type',
            exclude: ['id'],
          }),
        },
      },
    })
    productype: Omit<Producttype, 'id'>,
  ): Promise<Producttype> {
    return this.producttypeRepository.create(productype);
  }
}
