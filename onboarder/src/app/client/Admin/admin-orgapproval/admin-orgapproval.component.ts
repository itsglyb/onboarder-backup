import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-orgapproval',
  templateUrl: './admin-orgapproval.component.html',
  styleUrls: ['./admin-orgapproval.component.css']
})
export class AdminOrgapprovalComponent {

  form!:FormGroup

  OrganizationArray: any[] = [];
  acceptModalId: string = '';
  rejectModalId: string = '';

  remarks="";
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

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
      this.getAllOrganization();
    }

    ngOnInit(): void {
      // Load and initialize the JavaScript file
      this.loadScript('assets/js/accept-reject.js').then(() => {
        // The JavaScript file is loaded and initialized
      }).catch(error => {
        console.error('Error loading admin-org.js', error);
      });

    this.form = this.formBuilder.group({
      remarks: ['', Validators.required],
    })

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
    this.http.get("http://localhost:5000/api/approval")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.OrganizationArray = resultData;
      })
  }

  accept(_id: string): void{
    const updatedData = { isVerified: true };
    this.http.patch(`http://localhost:5000/api/orgRegister/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        Swal.fire('Registration Accepted')
        // Optionally, you can reload the updated data after verification
        this.getAllOrganization();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
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

    const remarksControl = this.form.get('remarks');
    
    if (remarksControl) {
      const updatedData = { 
        remarks: remarksControl.value,
      };
    
      this.http.patch("http://localhost:5000/api/orgRegister/" + this._id, updatedData, { withCredentials: true })
        .subscribe((response: any) => {
          // Handle the response as needed, for example, update the UI or show a success message
          console.log('Application rejected successfully:', response);
          Swal.fire('Application Application Rejected');
          // Optionally, you can reload the updated data after rejection
          this.getAllOrganization();
        }, (error) => {
          // Handle error if the PATCH request fails
          console.error('Error rejecting application:', error);
        });
    }

    this.http.delete("http://localhost:5000/api/reject-organization" + "/" + this._id).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllOrganization();
    })
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
