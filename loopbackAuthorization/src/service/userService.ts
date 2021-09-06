import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from './passwordHasher';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserRepository)
    public userCredentials: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) {}
  async verifyCredentials(credentials: Credentials): Promise<User> {
    //
    console.log(credentials);
    const foundUser = await this.userRepository.findOne({
      where: {
        Email: credentials.email,
      },
    });

    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `user not found with this ${credentials.email}`,
      );
    }

    const passwordMatched = await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('password is not valid');
    }
    return foundUser;
  }
  convertToUserProfile(user: User): UserProfile {
    // let userName = '';
    // if (user.FirstName) {
    //   userName = user.FirstName;
    // }
    // if (user.LastName) {
    //   userName = user.LastName
    //     ? `${user.FirstName} ${user.LastName}`
    //     : user.LastName;
    // }
    return {
      id: `${user.uid}`,
      name: user.Email,
      [securityId]: (user.uid || '').toString(),
    };
  }
}
