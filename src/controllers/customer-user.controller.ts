import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
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
import {Customer, User} from '../models';
import {CustomerRepository} from '../repositories';

@authenticate('jwt')
export class CustomerUserController {
  constructor(
    @repository(CustomerRepository)
    protected customerRepository: CustomerRepository,
  ) {}

  @get('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Customer has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.customerRepository.users(id).find(filter);
  }

  @authorize({allowedRoles: ['SuperAdmin']})
  @post('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.cid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInCustomer',
            exclude: ['uid'],
            optional: ['customerId'],
          }),
        },
      },
    })
    user: Omit<User, 'uid'>,
  ): Promise<User> {
    return this.customerRepository.users(id).create(user);
  }

  @authorize({allowedRoles: ['SuperAdmin', 'Admin']})
  @patch('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerRepository.users(id).patch(user, where);
  }

  @authorize({allowedRoles: ['SuperAdmin']})
  @del('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerRepository.users(id).delete(where);
  }
}
