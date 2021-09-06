import {authenticate, TokenService} from '@loopback/authentication';
import {Credentials} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
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
import {SecurityBindings, UserProfile} from '@loopback/security';
import {TokenServiceBindings, UserServiceBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../service/passwordHasher';
import {MyUserService} from '../service/userService';
//import {MyUserService} from '../service/userService';

export class UserControllerController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @inject('services.hasher')
    public bcryptHasher: BcryptHasher,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'The input of login function',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    credentials: Credentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token});
  }

  // @get('/whoAmI', {
  //   responses: {
  //     '200': {
  //       description: 'Return current user',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async whoAmI(
  //   @inject(SecurityBindings.USER)
  //   currentUserProfile: UserProfile,
  // ): Promise<string> {
  //   return currentUserProfile[];
  // }

  @authenticate('jwt')
  @authorize({allowedRoles: ['SuperAdmin']})
  @post('/signup')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async signup(
    @requestBody()
    user: User,
  ): Promise<User> {
    console.log('In signup');
    user.password = await this.bcryptHasher.hashPassword(user.password);
    return this.userRepository.create(user);
  }

  @authorize({allowedRoles: ['SuperAdmin']})
  @authenticate('jwt')
  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: User,
  ): Promise<User> {
    console.log('Inpost');
    return this.userRepository.create(user);
  }

  @authenticate('jwt')
  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate('jwt')
  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find({
      include: [
        {
          relation: 'customer',
        },
        {
          relation: 'role',
        },
      ],
    });
  }

  @authorize({allowedRoles: ['SuperAdmin', 'Admin']})
  @authenticate('jwt')
  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @authenticate('jwt')
  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, {
      include: [
        {
          relation: 'customer',
        },
        {
          relation: 'role',
        },
      ],
    });
  }

  @authorize({allowedRoles: ['SuperAdmin', 'Admin']})
  @authenticate('jwt')
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @authorize({allowedRoles: ['SuperAdmin', 'Admin']})
  @authenticate('jwt')
  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authorize({allowedRoles: ['SuperAdmin']})
  @authenticate('jwt')
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
