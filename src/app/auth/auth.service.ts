import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UserAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UserAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
        // credentials option right here is going to make sure that the request
        // is made and respects any cookies that are being received by the server.
        // without credentials: true -> after refresh browser cookies are gone..
        withCredentials: true
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http
      .get<any>(`${this.rootUrl}/auth/signedin`, {
        withCredentials: true
      })
      .pipe(
        tap(response => {
          console.log(response);
        })
      );
  }
}
