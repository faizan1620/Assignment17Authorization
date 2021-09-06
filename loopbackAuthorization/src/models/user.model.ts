import {UserCredentials} from '@loopback/authentication-jwt';
import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Customer} from './customer.model';
import {Role} from './role.model';

@model({
  settings: {
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_users_customer: {
        name: 'fk_users_customer',
        entity: 'Customer',
        entityKey: 'cid',
        foreignKey: 'customerid',
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_users_role: {
        name: 'fk_users_role',
        entity: 'Role',
        entityKey: 'rid',
        foreignKey: 'roleid',
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  uid: number;

  @property({
    type: 'string',
    required: true,
  })
  FirstName: string;

  @property({
    type: 'string',
    required: true,
  })
  MiddleName: string;

  @property({
    type: 'string',
    required: true,
  })
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  PhoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdon?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modifiedon?: Date;

  @hasOne(() => UserCredentials, {keyTo: 'user_id'})
  userCredentials: UserCredentials;

  @belongsTo(() => Customer, {name: 'customer'}, {name: 'customerid'})
  customerId: number;

  @belongsTo(() => Role, {name: 'role'}, {name: 'roleid'})
  roleId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
