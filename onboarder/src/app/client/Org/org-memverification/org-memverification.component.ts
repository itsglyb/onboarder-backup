import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';

interface MemForm {

  personalInfo: boolean,
  fullName: boolean,
  photo: boolean,
  sex: boolean,
  birthDate: boolean,
  placeOfBirth : boolean,
  civilStatus: boolean,
  religion: boolean,
  address: boolean,
  zip: boolean,
  email: boolean,
  contactNum: boolean,
  facebook: boolean,
    linkedIn: boolean,
    skype: boolean,
    zoom: boolean,
    idLicense: boolean,
    prcNo : boolean,
    prcDate: boolean,
    prcExpiration: boolean,
    studentID: boolean,
    aviation: boolean,
    caap: boolean,
    taxID: boolean,
    EducAttainment: boolean,
    tertiary: boolean,
    tertiaryDegree: boolean,
    tertiaryYear: boolean,
    tertiaryDiploma : boolean,
    masteral: boolean,
    masteralDegree: boolean,
    masteralYear: boolean,
    masteralDiploma: boolean,
    doctoral: boolean,
    doctoralDegree: boolean,
    doctoralYear: boolean,
    doctoralDiploma: boolean,
    employmentDetails: boolean,
    employer: boolean,
    jobTitle: boolean,
    employerAdd: boolean,
    membership: boolean,
    payment: boolean,
    memType1: boolean,
}

@Component({
  selector: 'app-org-memverification',
  templateUrl: './org-memverification.component.html',
  styleUrls: ['./org-memverification.component.css']
})
export class OrgMemverificationComponent {
  memForm$: Observable<MemForm> | undefined;

  form!:FormGroup

  membershipApplicationDetails: any[] = [];
  acceptModalId: string = '';
  rejectModalId: string = '';

  _id="";
  isVerified = "";
  isRejected = "";
  remarks="";
  chooseMem: any;
  payment: any;
  membership: any;
  employerAdd: any;
  jobTitle: any;
  employer: any;
  doctoralDiploma: any;
  doctoralYear: any;
  doctoralDegree: any;
  doctoral: any;
  masteralDiploma: any;
  masteralYear: any;
  masteralDegree: any;
  masteral: any;
  tertiaryDiploma: any;
  tertiaryYear: any;
  tertiaryDegree: any;
  tertiary: any;
  taxID: any;
  caap: any;
  aviation: any;
  studentID: any;
  prcExpiration: any;
  prcDate: any;
  prcNo: any;
  idLicense: any;
  zoom: any;
  skype: any;
  linkedIn: any;
  facebook: any;
  contactNum: any;
  email: any;
  zip: any;
  address: any;
  religion: any;
  civilStatus: any;
  placeOfBirth: any;
  birthDate: any;
  sex: any;
  photo: any;
  fullName: any;



constructor(
  private http: HttpClient, 
  private route: ActivatedRoute,
  private router: Router,
  private formBuilder: FormBuilder,
  private sanitizer:DomSanitizer
  ) {
    this.getAllMembershipApplication();
  }


  ngOnInit():void{
    this.loadScript('assets/js/accept-reject.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading accept-reject.js', error);
    });   

    this.form = this.formBuilder.group({
      remarks: ['', Validators.required],
      personalInfo: ['', Validators.required],
  fullName: ['', Validators.required],
  photo: ['', Validators.required],
  sex: ['', Validators.required],
  birthDate: ['', Validators.required],
  placeOfBirth : ['', Validators.required],
  civilStatus: ['', Validators.required],
  religion: ['', Validators.required],
  address: ['', Validators.required],
  zip: ['', Validators.required],
  email: ['', Validators.required],
  contactNum: ['', Validators.required],
  facebook: ['', Validators.required],
    linkedIn: ['', Validators.required],
    skype: ['', Validators.required],
    zoom: ['', Validators.required],
    idLicense: ['', Validators.required],
    prcNo : ['', Validators.required],
    prcDate: ['', Validators.required],
    prcExpiration: ['', Validators.required],
    studentID: ['', Validators.required],
    aviation: ['', Validators.required],
    caap: ['', Validators.required],
    taxID: ['', Validators.required],
    EducAttainment: ['', Validators.required],
    tertiary: ['', Validators.required],
    tertiaryDegree: ['', Validators.required],
    tertiaryYear: ['', Validators.required],
    tertiaryDiploma : ['', Validators.required],
    masteral: ['', Validators.required],
    masteralDegree: ['', Validators.required],
    masteralYear: ['', Validators.required],
    masteralDiploma: ['', Validators.required],
    doctoral: ['', Validators.required],
    doctoralDegree: ['', Validators.required],
    doctoralYear: ['', Validators.required],
    doctoralDiploma: ['', Validators.required],
    employmentDetails: ['', Validators.required],
    employer: ['', Validators.required],
    jobTitle: ['', Validators.required],
    employerAdd: ['', Validators.required],
    membership: ['', Validators.required],
    payment: ['', Validators.required],
    chooseMem: ['', Validators.required]
      
    

      
    })
    this.http.get('http://localhost:5000/api/organization', {
          withCredentials: true
        }).subscribe(
          (memResponse: any) => {
            const _id = memResponse._id;
          this.getMemFormat(_id);
          })


    
  }



  getAllMembershipApplication(): void {
    this.http.get("http://localhost:5000/api/verification", {withCredentials: true})
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.membershipApplicationDetails = resultData;

      });
  }

  setAcceptModalId(id: string): void {
    this.acceptModalId = id;
  }

  setRejectModalId(id: string): void {
    this.rejectModalId = id;
  }

  setView(data: any){
    this._id = data._id;
    this.fullName = data.fullName;
    this.photo = data.photo;
    this.sex = data.sex;
    this.birthDate = data.birthDate;
    this.placeOfBirth = data.placeOfBirth;
    this.civilStatus = data.civilStatus;
    this.religion = data.religion;
    this.address = data.address;
    this.zip = data.zip;
    this.email = data.email;
    this.contactNum = data.contactNum;
    this.facebook = data.facebook;
    this.linkedIn = data.linkedIn;
    this.skype = data.skype;
    this.zoom = data.zoom;
    this.idLicense = data.idLicense;
    this.prcNo = data.prcNo;
    this.prcDate = data.prcDate;
    this.prcExpiration = data.prcExpiration;
    this.studentID = data.studentID;
    this.aviation = data.aviation;
    this.caap = data.caap;
    this.taxID = data.taxID;
    this.tertiary = data.tertiary;
    this.tertiaryDegree = data.tertiaryDegree;
    this.tertiaryYear = data.tertiaryYear;
    this.tertiaryDiploma = data.tertiaryDiploma;
    this.masteral = data.masteral;
    this.masteralDegree = data.masteralDegree;
    this.masteralYear = data.masteralYear;
    this.masteralDiploma = data.masteralDiploma;
    this.doctoral = data.doctoral;
    this.doctoralDegree = data.doctoralDegree;
    this.doctoralYear = data.doctoralYear;
    this.doctoralDiploma = data.doctoralDiploma;
    this.employer = data.employer;
    this.jobTitle = data.jobTitle;
    this.employerAdd = data.employerAdd;
    this.membership = data.membership;
    this.payment = data.payment;
    this.chooseMem = data.chooseMem;
  }

  accept(_id: string): void{
    const updatedData = { isVerified: true };
    this.http.patch(`http://localhost:5000/api/membershipApplication/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        Swal.fire('Membership Application Accepted')
        // Optionally, you can reload the updated data after verification
        this.getAllMembershipApplication();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
      });

  }

  getMemFormat(_id: string) {
    this.memForm$ = this.http.get<MemForm>(`http://localhost:5000/api/myMemForm/${_id}`);
    this.memForm$.subscribe(data => {
      console.log('API Response:', data);
    });
  }

  getMemForm(_id: string): void {
    this.http.get(`http://localhost:5000/api/membershipApplication/${_id}`, { withCredentials: true })
      .subscribe((resultData) => {
        console.log(resultData);
        

        // Populate the form controls with the received data
        this.form.patchValue(resultData);
      });
  }

  reject(_id: string): void {
    const remarksControl = this.form.get('remarks');
    
    if (remarksControl) {
      const updatedData = { 
        isRejected: true,
        remarks: remarksControl.value,
      };
    
      this.http.patch(`http://localhost:5000/api/membershipApplication/${_id}`, updatedData, { withCredentials: true })
        .subscribe((response: any) => {
          // Handle the response as needed, for example, update the UI or show a success message
          console.log('Application rejected successfully:', response);
          Swal.fire('Membership Application Rejected');
          // Optionally, you can reload the updated data after rejection
          this.getAllMembershipApplication();
        }, (error) => {
          // Handle error if the PATCH request fails
          console.error('Error rejecting application:', error);
        });
    }
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