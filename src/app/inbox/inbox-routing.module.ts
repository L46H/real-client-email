import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // we refer to that ':id' as url parameter it is key value of obj
      // basically it is extracting some part of the url
      { path: ':id', component: EmailShowComponent },
      {
        path: '',
        component: PlaceholderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {}
