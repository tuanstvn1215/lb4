import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
  juggler,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todolist, TodolistRelations, Todo, TodolistDetail} from '../models';
import {TodolistDetailRepository} from './todolist-detail.repository';
import {TodoRepository} from './todo.repository';

export class TodolistRepository extends DefaultCrudRepository<
  Todolist,
  typeof Todolist.prototype.id,
  TodolistRelations
> {
  public readonly todos: HasManyThroughRepositoryFactory<
    Todo,
    typeof Todo.prototype.id,
    TodolistDetail,
    typeof Todolist.prototype.id
  >;
  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
    @repository.getter('TodoRepository')
    todoRepositoryGetter: Getter<TodoRepository>,
    @repository.getter('TodoListRepository')
    todolistDetailRepositoryGetter: Getter<TodolistDetailRepository>,
  ) {
    super(Todolist, db);
    this.todos = this.createHasManyThroughRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
      todolistDetailRepositoryGetter,
    );
  }
}
