import {UserCredentialsRepository} from '@loopback/authentication-jwt';
import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, Role, User, UserRelations} from '../models';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export declare type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.uid,
  UserRelations
> {
  public readonly customer: BelongsToAccessor<
    Customer,
    typeof User.prototype.uid
  >;

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.uid>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
    @repository.getter(UserCredentialsRepository)
    userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modifiedon = new Date();
    });
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
