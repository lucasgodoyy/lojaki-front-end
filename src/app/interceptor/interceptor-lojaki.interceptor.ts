
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class interceptorLojakiInterceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.info('interceptor acionado')

    var authorization = localStorage.getItem('Authorization')

    if (authorization !== '' && authorization !== null && authorization !== 'null') {

      
      console.info('Token: ' + authorization)


      const autRequ = request.clone({
        headers: request.headers.set('Authorization', authorization)

      })
        return next.handle(autRequ)
    }

    return next.handle(request)

  }
};
