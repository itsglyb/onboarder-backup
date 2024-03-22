import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-landing',
  templateUrl: './org-landing.component.html',
  styleUrls: ['./org-landing.component.css']
})
export class OrgLandingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  navigatetoSignUp() {
    this.router.navigate(['org-registration']);
  }

  navigatetoLogIn() {
    this.router.navigate(['auth-login']);
  }
}
