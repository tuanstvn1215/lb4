// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {jsonToSchemaObject, post, requestBody, response} from '@loopback/rest';
import {Result} from '../models';
import {ResultRepository} from '../repositories';

// import {inject} from '@loopback/core';

export class CalculatorController {
  constructor(
    @repository(ResultRepository)
    public resultRepository: ResultRepository,
  ) {}

  @post('/calculate/add')
  @response(200, {
    description: 'Result',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'calResult',
          properties: {
            result: {type: 'string'},
            num1: {type: 'number'},
            num2: {type: 'number'},
            createAt: {type: 'string'},
          },
        },
      },
    },
  })
  async calulate(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'cal',
            properties: {
              num1: {type: 'number'},
              num2: {type: 'number'},
            },
          },
        },
      },
    })
    body: {
      num1: number;
      num2: number;
    },
  ) {
    console.log(new Date(Date.now()).toDateString());
    this.resultRepository.create({
      result: (body.num1 + body.num2).toString(),
      num1: body.num1,
      num2: body.num2,
      createAt: Date.now(),
    });
    return body.num1 + body.num2;
  }
  @post('/calculate/minus')
  @response(200, {
    description: 'Result',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'calResult',
          properties: {
            result: {type: 'string'},
            num1: {type: 'number'},
            num2: {type: 'number'},
            createAt: {type: 'string'},
          },
        },
      },
    },
  })
  async minus(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'cal',
            properties: {
              num1: {type: 'number'},
              num2: {type: 'number'},
            },
          },
        },
      },
    })
    body: {
      num1: number;
      num2: number;
    },
  ) {
    console.log(new Date(Date.now()).toDateString());
    this.resultRepository.create({
      result: (body.num1 - body.num2).toString(),
      num1: body.num1,
      num2: body.num2,
      createAt: Date.now(),
    });
    return body.num1 - body.num2;
  }
}
