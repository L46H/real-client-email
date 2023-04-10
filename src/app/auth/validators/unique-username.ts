import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  // in that case arrow function return context
  // instead of normal function which is not
  validate = (formControl: FormControl) => {
    const { value } = formControl;

    console.log(value);

    return null;
  }
}
