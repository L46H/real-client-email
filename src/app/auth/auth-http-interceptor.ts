import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { Observable, filter, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    // req obj will be send to remote server contains
    // url, method, headers, params, etc..
    req: HttpRequest<any>,
    // the next interceptor that we need to run
    // and eventually end on that function that
    // we are going to run to make the request
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req obj is readonly co it cannot be,
    // modified directly

    // modify or log the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    });

    return next.handle(modifiedReq).pipe(
      filter(val => val.type === HttpEventType.Sent),

      tap(val => {
        console.log('Sent the request');
      })
    );
  }
}
