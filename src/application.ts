import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {JWTAuthenticationComponent} from '@loopback/authentication-jwt';
import {
  AuthorizationComponent,
  AuthorizationDecision,
  AuthorizationOptions,
  AuthorizationTags,
} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import {
  HelmetSecurityBindings,
  Loopback4HelmetComponent,
} from 'loopback4-helmet';
import path from 'path';
import {MyAuthorizationProvider} from './authorizeProvider';
import {JWTStrategy} from './authStrategies/jwtStrategy';
import {DbDataSource} from './datasources';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings,
} from './keys';
import {MySequence} from './sequence';
import {JWTService} from './service/jwtService';
import {BcryptHasher} from './service/passwordHasher';
import {MyUserService} from './service/userService';

export {ApplicationConfig};

export class Loopback1Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.component(Loopback4HelmetComponent);
    this.bind(HelmetSecurityBindings.CONFIG).to({
      referrerPolicy: {
        policy: 'same-origin',
      },
      contentSecurityPolicy: {
        directives: {
          frameSrc: ["'self'"],
        },
      },
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);

    //this.component(JWTAuthenticationComponent);
    registerAuthenticationStrategy(this, JWTStrategy);
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);

    // Set up the custom sequence
    this.sequence(MySequence);
    const options1: AuthorizationOptions = {
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    };

    const binding = this.component(AuthorizationComponent);
    this.configure(binding.key).to(options1);

    this.bind('authorizationProviders.my-authorizer-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    //  this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UserRepository);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
