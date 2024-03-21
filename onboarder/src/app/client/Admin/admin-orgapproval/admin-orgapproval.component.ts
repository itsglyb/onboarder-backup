import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-orgapproval',
  templateUrl: './admin-orgapproval.component.html',
  styleUrls: ['./admin-orgapproval.component.css']
})
export class AdminOrgapprovalComponent implements OnInit {
  private apiUrl = environment.apiUrl;


  form!: FormGroup;

  OrganizationArray: any[] = [];
  acceptModalId: string = '';
  rejectModalId: string = '';

  remarks = "";
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
  certificate: string | ArrayBuffer | null = null;
  imageObjectUrl: string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Initialize form group
    this.form = this.formBuilder.group({
      remarks: ['', Validators.required],
    });

    // Load organization data
    this.getAllOrganization();

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/accept-reject.js').then(() => {
      console.log('Script loaded successfully.');
    }).catch(error => {
      console.error('Error loading script:', error);
    });
  }

  setAcceptModalId(id: string): void {
    this.acceptModalId = id;
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertfiletobase64(file, (base64String) => {
      // Set the base64 string to the logo form control
      this.logo = base64String;
      this.certificate = base64String;
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
    this.http.get(`${this.apiUrl}api/approval`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.OrganizationArray = resultData;
      });
  }

  accept(_id: string): void {
    const updatedData = { isApproved: true };
    this.http.patch(`${this.apiUrl}api/orgRegister/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        Swal.fire('Registration Accepted');
        // Optionally, you can reload the updated data after verification
        this.getAllOrganization();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
      });
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
    this.certificate = data.certificate;
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
      "certificate": this.certificate,
      "orgCode": this.orgCode
    };

    this.http.patch(`${this.apiUrl}api/organization` + "/" + this._id, orgData).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllOrganization();
    });
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
    this.certificate = data.certificate;
    this.orgCode = data.orgCode;
  }

  deleteOrganization() {
    const remarksControl = this.form.get('remarks');
    if (remarksControl && remarksControl.valid) {
      const remarksValue = remarksControl.value;
      this.http.patch(`${this.apiUrl}api/orgRegister/` + this._id, { remarks: remarksValue }, { withCredentials: true })
        .subscribe((response: any) => {
          console.log('Application rejected successfully:', response);
          Swal.fire('Application Rejected');
          this.getAllOrganization();
        }, (error) => {
          console.error('Error rejecting application:', error);
        });
    } else {
      console.error('Invalid form data.');
      return;
    }

    this.http.delete(`${this.apiUrl}api/reject-organization` + "/" + this._id).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllOrganization();
    });
  }

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return Math.min(this.startIndex() + this.itemsPerPage - 1, this.OrganizationArray.length - 1);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  search() {
    if (!this.searchQuery.trim()) {
      this.getAllOrganization();
      return;
    }

    const searchTerm = this.searchQuery.toLowerCase();

    this.OrganizationArray = this.OrganizationArray.filter(org => {
      if (org && org.orgName) {
        return org.orgName.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  }

  private loadScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.type = 'text/javascript';
      scriptElement.onload = () => resolve();
      scriptElement.onerror = (error) => reject(error);
      document.body.appendChild(scriptElement);
    });
  }
}
