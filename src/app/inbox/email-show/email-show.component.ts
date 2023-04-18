import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // We chained onto this params
    // the params property is a behavior subject that is going to
    // emit values any time the url changes
    this.route.params.subscribe(({ id }) => {
      // returns observable itself so it's needed
      // to nest subscribe
      this.emailService.getEmail(id).subscribe(email => {
        console.log(email);
      });
    });
  }
}
