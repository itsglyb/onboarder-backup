import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-navbar',
  templateUrl: './org-navbar.component.html',
  styleUrls: ['./org-navbar.component.css']
})
export class OrgNavbarComponent implements OnInit {
  organization!: string;
  logo!:string;
  orgCode!:string;
  orgID!:string;

  constructor(private http:HttpClient,
    private router: Router) { }

  redirecttoOrgEvent(orgID: string) {
    this.router.navigate(['/org-events', orgID]);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/organization', {
      withCredentials: true
    }).subscribe(
      (res:any) => {
        this.organization = `${res.orgName}`;
        this.logo = `${res.logo}`;
        this.orgCode = `${res.orgCode}`; 
        this.orgID = `${res._id}`;
      },
      (err) => {
        this.organization = "error"
        this.logo = "error"
        this.orgCode = "error"
      }
    )

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/navbar.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading navbar.js', error);
    });
  }

  logout() {
    this.http.post('http://localhost:5000/api/logout', null, { withCredentials: true }).subscribe(
      (response) => {
        // Handle the successful logout response here
        this.router.navigate(['/auth-login']);
      },
      (error) => {
        // Handle any errors that occur during the logout process
      }
    );
   
  }

  private loadScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.type = 'text/javascript';
      scriptElement.onload = () => resolve(); // Change this line
      scriptElement.onerror = (error) => reject(error); // Change this line
      document.body.appendChild(scriptElement);
    });
  }
}
