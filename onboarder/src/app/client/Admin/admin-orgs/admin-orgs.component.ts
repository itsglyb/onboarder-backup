import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orgs',
  templateUrl: './admin-orgs.component.html',
  styleUrls: ['./admin-orgs.component.css']
})
export class AdminOrgsComponent {
  OrganizationArray: any[] = [];
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
  Math: any = Math;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  logo: string | ArrayBuffer | null = null;
  imageObjectUrl: string = "";

  constructor(private http: HttpClient) {
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

  getAllOrganization() {
    this.http.get("http://localhost:5000/api/vieworganization")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.OrganizationArray = resultData;
      })
  }

  setUpdate(data: any) {
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

  updateOrganization() {
    let orgData = {
      "orgName": this.orgName,
      "orgType": this.orgType,
      "orgHistory": this.orgHistory,
      "email": this.email,
      "dateCreated": this.dateCreated,
      "_id": this._id,
      "about": this.about,
      "mission": this.mission,
      "vision": this.vision,
      "coreValues": this.coreValues,
      "logo": this.logo,
      "orgCode": this.orgCode
    }

    this.http.patch("http://localhost:5000/api/organization" + "/" + this._id, orgData).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllOrganization();
    })
  }

  setDelete(data: any) {
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

  deleteOrganization() {
    let orgData = {
      "orgName": this.orgName,
      "orgType": this.orgType,
      "orgHistory": this.orgHistory,
      "email": this.email,
      "dateCreated": this.dateCreated,
      "_id": this._id,
      "about": this.about,
      "mission": this.mission,
      "vision": this.vision,
      "coreValues": this.coreValues,
      "logo": this.logo,
      "orgCode": this.orgCode
    }

    this.http.delete("http://localhost:5000/api/organization" + "/" + this._id).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllOrganization();
    })
  }

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Calculate the end index of the items to display on the current page
  endIndex(): number {
    return Math.min(this.startIndex() + this.itemsPerPage - 1, this.OrganizationArray.length - 1);
  }

  // Function to change the current page
  setPage(page: number) {
    this.currentPage = page;
  }

  search() {
    // If search query is empty, reset OrganizationArray to show all organizations
    if (!this.searchQuery.trim()) {
      this.getAllOrganization();
      return;
    }

    // Convert searchQuery to lowercase for case-insensitive search
    const searchTerm = this.searchQuery.toLowerCase();

    // Filter OrganizationArray based on search query
    this.OrganizationArray = this.OrganizationArray.filter(org => {
      // Check if organization and orgName property exist
      if (org && org.orgName) {
        // Perform case-insensitive search on orgName
        return org.orgName.toLowerCase().includes(searchTerm);
      }
      return false; // Exclude organization if orgName is not present
    });
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
