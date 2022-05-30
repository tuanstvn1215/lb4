import {/* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {TodolistRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TodoService {
  constructor(
    @inject('TodoListrepository')
    private todoListrepository: TodolistRepository /* Add @inject to inject parameters */,
  ) {}

  async getTodolist(id: number) {
    return this.todoListrepository.findById(id);
  }
  /*
   * Add service methods here
   */
}
