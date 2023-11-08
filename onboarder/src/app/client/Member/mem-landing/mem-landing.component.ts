import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mem-landing',
  templateUrl: './mem-landing.component.html',
  styleUrls: ['./mem-landing.component.css']
})
export class MemLandingComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigatetoSignUp() {
    this.router.navigate(['member-signup']);
  }

  navigatetoLogIn() {
    this.router.navigate(['auth-login']);
  }
}
