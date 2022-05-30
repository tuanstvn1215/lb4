import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';

import {Todolist} from '../models';
import {TodolistRepository} from '../repositories';
import {TodoService} from '../services';

export class TodolistController {
  constructor(
    @repository(TodolistRepository)
    public todolistRepository: TodolistRepository,
    @inject('service.TodoService')
    public todoService: TodoService,
  ) {}

  @post('/todolists')
  @response(200, {
    description: 'Todolist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todolist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todolist, {
            title: 'NewTodolist',
            exclude: ['id'],
          }),
        },
      },
    })
    todolist: Omit<Todolist, 'id'>,
  ): Promise<Todolist> {
    return this.todolistRepository.create(todolist);
  }

  @get('/todolists/count')
  @response(200, {
    description: 'Todolist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Todolist) where?: Where<Todolist>): Promise<Count> {
    return this.todolistRepository.count(where);
  }

  @get('/todolists')
  @response(200, {
    description: 'Array of Todolist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todolist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todolist) filter?: Filter<Todolist>,
  ): Promise<Todolist[]> {
    return this.todolistRepository.find(filter);
  }
  @get('/todolist/findbytitle/}')
  @response(200, {
    description: 'todolist found by title',
    context: {
      'application/json': {
        schema: getModelSchemaRef(Todolist, {partial: true}),
      },
    },
  })
  async findByTitle(@param.query.string('title') title: string) {
    return await this.todolistRepository.findByTitle(title);
  }

  @patch('/todolists')
  @response(200, {
    description: 'Todolist PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todolist, {partial: true}),
        },
      },
    })
    todolist: Todolist,
    @param.where(Todolist) where?: Where<Todolist>,
  ): Promise<Count> {
    return this.todolistRepository.updateAll(todolist, where);
  }

  @get('/todolists/{id}')
  @response(200, {
    description: 'Todolist model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todolist, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todolist, {exclude: 'where'})
    filter?: FilterExcludingWhere<Todolist>,
  ): Promise<Todolist> {
    return this.todoService.getTodolist(id);
  }

  @patch('/todolists/{id}')
  @response(204, {
    description: 'Todolist PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todolist, {partial: true}),
        },
      },
    })
    todolist: Todolist,
  ): Promise<void> {
    await this.todolistRepository.updateById(id, todolist);
  }

  @put('/todolists/{id}')
  @response(204, {
    description: 'Todolist PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todolist: Todolist,
  ): Promise<void> {
    await this.todolistRepository.replaceById(id, todolist);
  }

  @del('/todolists/{id}')
  @response(204, {
    description: 'Todolist DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todolistRepository.deleteById(id);
  }
}
