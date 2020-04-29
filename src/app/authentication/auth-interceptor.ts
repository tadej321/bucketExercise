import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * ARGUMENTS:
   *  @req[HttpRequest]: the request we are intercepting
   *  @next:[HttpHandler]: allows us to leave the interceptor once it has finished.
   *
   * FUNCTION:
   * This method mandatory, because Angular will call this method for requests leaving the app.
   **/
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.authService.getToken();

    const authRequest = req.clone( {
      headers: req.headers.set('Authorization', 'Bearer' + authToken)
    });
    return next.handle(authRequest);
  }

}
