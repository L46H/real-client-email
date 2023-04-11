import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm: FormGroup;

  ngOnInit(): void {
    this.authForm = new FormGroup(
      {
        username: new FormControl(
          '',
          // all synchronous validators must runs first
          // then async validator can start running
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            // alpha numeric characters only
            Validators.pattern(/^[a-z0-9]+$/)
          ],
          // 3rd argument in FormControl
          // is reserved for async validators
          [this.uniqueUsername.validate]
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      },
      { validators: [this.matchPassword.validate] }
    );
  }
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signup(this.authForm.value).subscribe({
      next: response => {
        // Navigate to some other route
      },
      error: err => {
        // (!err.status) alternative to code below
        if (err.status === 0) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }
}
