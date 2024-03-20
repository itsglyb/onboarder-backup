import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {
  _id!: string;
  orgName!: string;
  orgType!: string;
  email!: string;
  about!: string;
  orgHistory!: string;
  vision!: string;
  mission!: string;
  coreValues!: string;
  logo:string | ArrayBuffer | undefined;
  orgCode!: string;
  OrgArray: any[] = [];



  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.fetchOrgInfo();
    this.updateOrgInfo();
  }

  ngOnInit(): void {
    this.fetchOrgInfo();
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/uploadphoto.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading uploadphoto.js', error);
    });
  }

  fetchOrgInfo(): void {
    this.http.get('http://localhost:5000/api/organization', {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.setUpdate(res);
        this.updateOrgInfo();
        // Update the data immediately
      },
      (err) => {
        this._id = "error";
        this.orgName = "error";
        this.orgType = "error";
        this.email = "error";
        this.about = "error";
        this.orgHistory = "error";
        this.mission = "error";
        this.vision = "error";
        this.coreValues = "error";
        this.logo = "error";
        this.orgCode = "error";
      }
    );
  }

  setUpdate(res: any) {
    this._id = `${res._id}`;
    this.orgName = `${res.orgName}`;
    this.orgType = `${res.orgType}`;
    this.email = `${res.email}`;
    this.about = `${res.about}`;
    this.orgHistory = `${res.orgHistory}`;
    this.mission = `${res.mission}`;
    this.vision = `${res.vision}`;
    this.coreValues = `${res.coreValues}`;
    this.logo = `${res.logo}`
    this.orgCode = `${res.orgCode}`;
  }

  checkOrgCodeExpiration(): void {
    if (!this.orgCode) {
      console.error('OrgCode not found');
      return;
    }

    const currentDate = new Date();
    const expirationDate = new Date(this.orgCode.split('-')[1]); // Extract expiration date from orgCode
    if (currentDate > expirationDate) {
      // OrgCode has expired, generate a new one
      this.generateNewOrgCode();
    }
  }

  makeRandomCode(lengthOfCode: number, possible: string) {
    let text="";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  generateNewOrgCode(): void {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    const lengthOfCode = 8;
    const result = this.makeRandomCode(lengthOfCode, possible);
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(expirationDate.getTime() + 3 * 60 * 1000); // Set expiration date to 30 days from today

    // Set the new orgCode with expiration date
    this.orgCode = `${result}-${expirationDate.toISOString()}`;

    // Update orgCode in the backend
    this.updateOrgInfo();
  }


  updateOrgInfo(): void {
    let orgData = {
      "_id": this._id,
      "orgName": this.orgName,
      "orgType": this.orgType,
      "email": this.email,
      "about": this.about,
      "orgHistory": this.orgHistory,
      "mission": this.mission,
      "vision": this.vision,
      "coreValues": this.coreValues,
      "logo": this.logo,
      "orgCode": this.orgCode
    };

    this.http.patch('http://localhost:5000/api/organization' + '/' + this._id, orgData, {
      withCredentials: true
    }).subscribe(
      (updatedData: any) => {
        // Update the UI directly with the new data
        this._id = updatedData._id;
        this.orgName = updatedData.orgName;
        this.orgType = updatedData.orgType;
        this.email = updatedData.email;
        this.about = updatedData.about;
        this.orgHistory = updatedData.orgHistory;
        this.mission = updatedData.mission;
        this.vision = updatedData.vision;
        this.coreValues = updatedData.coreValues;
        this.logo = updatedData.logo;
        this.orgCode = updatedData.orgCode;

        console.log(updatedData);
      },
      (error) => {
        console.error('Error updating organization:', error);
        // Handle errors, e.g., show an error message to the user
      }
    );
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertfiletobase64(file, (base64String) => {
      // Set the base64 string to the logo form control
      this.logo = base64String;
    });
  }

  // Your convertfiletobase64 function
  convertfiletobase64(file: File, callback: (base64string: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64string = reader.result as string;


      callback(base64string);
    };
    reader.readAsDataURL(file);
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
