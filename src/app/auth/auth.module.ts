import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignoutComponent } from './signout/signout.component';
import { InboxModule } from '../inbox/inbox.module';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    InboxModule
  ],
  exports: [
    SignupComponent
  ]
})
export class AuthModule { }
