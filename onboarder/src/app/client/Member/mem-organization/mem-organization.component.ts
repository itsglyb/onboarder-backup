import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mem-organization',
  templateUrl: './mem-organization.component.html',
  styleUrls: ['./mem-organization.component.css']
})
export class MemOrganizationComponent implements OnInit{
  form!:FormGroup

  OrganizationArray: any[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private formBuilder: FormBuilder) {
    this.getAllOrganization();
  }

  getAllOrganization() {
    this.http.get('http://localhost:5000/api/member', {
      withCredentials: true
    }).subscribe(
      (memResponse: any) => {
        const memID = memResponse._id;
  
        this.http.get(`http://localhost:5000/api/myOrganizations/${memID}`, {
          withCredentials: true
        }).subscribe((resultData: any) => {
          console.log(resultData);
          this.OrganizationArray = resultData;
        });
      },
      error => {
        console.error(error);
        // Handle errors from the first request if necessary
      }
    );
  }
  
  

  redirectToOrgProfile(orgId: string) {
    this.router.navigate(['/member-orgprofile', orgId]);
  }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      orgCode:"",
    })

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/mem-org.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading mem-org.js', error);
    });    

    
  }

  submit(event: Event) {
    event.preventDefault();
    const orgCode = this.form.get('orgCode')?.value;
    this.redirectToOrgProfile1(orgCode);
  }
  

redirectToOrgProfile1(orgCode: string) {
  this.router.navigate(['/member-orgprofile1', orgCode]);

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
