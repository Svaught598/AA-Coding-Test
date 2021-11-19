import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  form : any;
  email : string;
  status : string;
  password : string;

  constructor(private r : Router) {
    this.form = this.r.getCurrentNavigation()?.extras.state;
    this.email = this.form.email;
    this.status = this.form.status;
    this.password = this.form.password;
  }

  ngOnInit(): void {
  }
}
