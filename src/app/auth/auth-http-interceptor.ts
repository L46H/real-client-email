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

    // other uses of Interceptors

    // when we call next.handle we get back an observable
    return next.handle(modifiedReq)
    // .pipe(
    //   tap(val => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('Request was sent to server');
    //     }

    //     if (val.type === HttpEventType.Response) {
    //       console.log('Got a response from the API', val);
    //     }
    //   })
    // )



    // .pipe(
    //   filter(val => val.type === HttpEventType.Sent),

    //   tap(val => {
    //     console.log('Sent the request');
    //   })
    //);
  }
}

// over all, the interceptor is not just about intercepting and modifying the request
// We can also use it to take a look at the information that is coming back as well.
// that information which is comming back will be emitted by OBSERVABLE