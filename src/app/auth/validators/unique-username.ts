import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  // in that case arrow function return context
  // instead of normal function which is not
  validate = (formControl: FormControl) => {
    const { value } = formControl;

    // second argument is object that contains the data
    // that we want to provide in the body of the post request
    return this.http
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value
      })
      .pipe(
        map(value => {
          if (value.available) {
            return null;
          }
        }),
        // no make difference if catchError
        // operator is above or below that map operator
        catchError(err => {
          console.log(err);
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
