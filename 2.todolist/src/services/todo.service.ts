import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {TodoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TodoService {
  constructor(
    @repository(TodoRepository) private todoRepository: TodoRepository,
  ) /* Add @inject to inject p   arameters */ {}
  async gettodobyId(id: number) {
    return this.todoRepository.findById(id);
  }

  /*
   * Add service methods here
   */
}
