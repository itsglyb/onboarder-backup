import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-orgs',
  templateUrl: './admin-orgs.component.html',
  styleUrls: ['./admin-orgs.component.css']
})
export class AdminOrgsComponent {
  OrganizationArray : any[] =[];
  _id = "";
  orgName = "";
  orgType = "";
  email = "";
  dateCreated: any;
  orgHistory: any;
  about = "";
  mission = "";
  coreValues = "";
  password = "";
  vision = "";
  orgCode = "";
  
  logo: string | ArrayBuffer | null = null;
  imageObjectUrl: string = "";

  constructor(private http: HttpClient){
    this.getAllOrganization();
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
  
  getAllOrganization(): void {
    this.http.get("http://localhost:5000/api/vieworganization")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.OrganizationArray = resultData;
      });
  }

  setUpdate(data:any)
  {
    this._id = data._id;
    this.orgName = data.orgName;
    this.orgType = data.orgType;
    this.about = data.about;
    this.orgHistory = data.orgHistory;
    this.mission = data.mission;
    this.vision = data.vision;
    this.coreValues = data.coreValues;
    this.email = data.email;
    this.dateCreated = data.dateCreated;
    this.logo = data.logo;
    this.orgCode = data.orgCode;
  }

  updateOrganization(){
    let orgData = {
      "orgName" : this.orgName,
      "orgType" : this.orgType,
      "orgHistory": this.orgHistory,
      "email" : this.email,
      "dateCreated" : this.dateCreated,
      "_id" : this._id,
      "about" : this.about,
      "mission" : this.mission,
      "vision" : this.vision,
      "coreValues" : this.coreValues,
      "logo" : this.logo,
      "orgCode" : this.orgCode
    }

    this.http.patch("http://localhost:5000/api/organization" + "/" + this._id, orgData).subscribe((resultData:any)=>
    {
      console.log(resultData);
      this.getAllOrganization();
    })
  }
  
  setDelete(data:any) {
    this._id = data._id;
    this.orgName = data.orgName;
    this.orgType = data.orgType;
    this.about = data.about;
    this.orgHistory = data.orgHistory;
    this.mission = data.mission;
    this.vision = data.vision;
    this.coreValues = data.coreValues;
    this.email = data.email;
    this.dateCreated = data.dateCreated;
    this.logo = data.logo;
    this.orgCode = data.orgCode;
  }

  deleteOrganization(){
    let orgData = {
      "orgName" : this.orgName,
      "orgType" : this.orgType,
      "orgHistory": this.orgHistory,
      "email" : this.email,
      "dateCreated" : this.dateCreated,
      "_id" : this._id,
      "about" : this.about,
      "mission" : this.mission,
      "vision" : this.vision,
      "coreValues" : this.coreValues,
      "logo" : this.logo,
      "orgCode" : this.orgCode
    }

    this.http.delete("http://localhost:5000/api/organization" + "/" + this._id).subscribe((resultData:any)=>
    {
      console.log(resultData);
      this.getAllOrganization();
    })
  }
  
  ngOnInit(): void {
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/admin-org.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading admin-org.js', error);
    });   
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