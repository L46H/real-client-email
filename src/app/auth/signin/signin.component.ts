import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm: FormGroup;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        // alpha numeric characters only
        Validators.pattern(/^[a-z0-9]+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    });
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signin(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.authForm.setErrors({ credentials: true });
        } else if (error.status === 0) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }
}
