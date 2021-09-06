import {compare, genSalt, hash} from 'bcryptjs';

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providePass: T, storedPass: T): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  async comparePassword(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const passwordMatched = await compare(providedPassword, storedPassword);
    console.log(passwordMatched);
    return passwordMatched;
  }
}
