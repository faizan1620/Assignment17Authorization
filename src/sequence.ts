import {
  AuthenticateFn,
  AuthenticationBindings,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  InvokeMiddleware,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {HelmetAction, HelmetSecurityBindings} from 'loopback4-helmet';

const SequenceActions = RestBindings.SequenceActions;
export class MySequence implements SequenceHandler {
  @inject(SequenceActions.INVOKE_MIDDLEWARE)
  private invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) protected send: Send,
    @inject(SequenceActions.REJECT) protected reject: Reject,
    @inject(HelmetSecurityBindings.HELMET_SECURITY_ACTION)
    protected helmetAction: HelmetAction,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const done = await this.invokeMiddleware(context);
      if (done) {
        return;
      }
      const route = this.findRoute(request);
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      await this.helmetAction(request, response);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(err, {statusCode: 401});
      }

      this.reject(context, err);
    }
  }
}
