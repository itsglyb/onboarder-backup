import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-login',
  templateUrl: './general-login.component.html',
  styleUrls: ['./general-login.component.css']
})
export class GeneralLoginComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  navigatetoOrgCommunity() {
    this.router.navigate(['org-community']);
  }
}
