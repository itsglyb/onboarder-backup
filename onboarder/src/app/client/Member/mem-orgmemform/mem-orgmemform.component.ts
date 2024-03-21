import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


interface MemForm {
  personalInfo: boolean;
  fullName: boolean;
  photo: boolean;
  sex: boolean;
  birthDate: boolean;
  placeOfBirth: boolean;
  civilStatus: boolean;
  religion: boolean;
  address: boolean;
  zip: boolean;
  email: boolean;
  contactNum: boolean;
  region: boolean;
  facebook: boolean;
  linkedIn: boolean;
  skype: boolean;
  zoom: boolean;
  idLicense: boolean;
  prcNo: boolean;
  prcDate: boolean;
  prcExpiration: boolean;
  studentID: boolean;
  aviation: boolean;
  caap: boolean;
  taxID: boolean;
  companyID: boolean;
  EducAttainment: boolean;
  tertiary: boolean;
  tertiaryDegree: boolean;
  tertiaryYear: boolean;
  tertiaryDiploma: boolean;
  masteral: boolean;
  masteralDegree: boolean;
  masteralYear: boolean;
  masteralDiploma: boolean;
  doctoral: boolean;
  doctoralDegree: boolean;
  doctoralYear: boolean;
  doctoralDiploma: boolean;
  employmentDetails: boolean;
  employer: boolean;
  jobTitle: boolean;
  employerAdd: boolean;
  specialization: boolean;
  membership: boolean;
  payment: boolean;
  memType1: boolean;
  memType2: boolean;
  memType3: boolean;
  memType1Details: boolean;
  memType2Details: boolean;
  memType3Details: boolean;
  memType1Fee: boolean;
  memType2Fee: boolean;
  memType3Fee: boolean;
  memType1Process: boolean;
  date: boolean;
  memType1Input: String;
  memType2Input: String;
  memType3Input: String;
  memType4Input: String;
  memType5Input: String;
  memType6Input: String;
  memType1DetailsInput: String;
  memType2DetailsInput: String;
  memType3DetailsInput: String;
  memType4DetailsInput: String;
  memType5DetailsInput: String;
  memType6DetailsInput: String;
  memType1FeeInput: String;
  memType2FeeInput: String;
  memType3FeeInput: String;
  memType4FeeInput: String;
  memType5FeeInput: String;
  memType6FeeInput: String;
  memType1ProcessInput: String;
}

@Component({
  selector: 'app-mem-orgmemform',
  templateUrl: './mem-orgmemform.component.html',
  styleUrls: ['./mem-orgmemform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemOrgmemformComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  memForm$: Observable<MemForm> | undefined;
  form!: FormGroup;
  submitted: boolean = false;
  payment: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Define form controls with validators
      photo: ['', Validators.required],
      remarks: ['', Validators.required],
      fullName: ['', Validators.required],
      sex: ['', Validators.required],
      birthDate: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      civilStatus: ['', Validators.required],
      religion: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Use both required and email validators
      contactNum: ['', Validators.required],
      region: ['', Validators.required],
      prcNo: ['', Validators.required],
      prcDate: ['', Validators.required],
      prcExpiration: ['', Validators.required],
      studentID: ['', Validators.required],
      companyID: ['', Validators.required],
      EducAttainment: ['', Validators.required],
      tertiary: ['', Validators.required],
      tertiaryDegree: ['', Validators.required],
      tertiaryYear: ['', Validators.required],
      tertiaryDiploma: ['', Validators.required],
      tertiaryDiploma1: ['', Validators.required],
      masteral: ['', Validators.required],
      masteralDegree: ['', Validators.required],
      masteralYear: ['', Validators.required],
      masteralDiploma: ['', Validators.required],
      masteralDiploma1: ['', Validators.required],
      doctoral: ['', Validators.required],
      doctoralDegree: ['', Validators.required],
      doctoralYear: ['', Validators.required],
      doctoralDiploma: ['', Validators.required],
      doctoralDiploma1: ['', Validators.required],
      employer: ['', Validators.required],
      jobTitle: ['', Validators.required],
      specialization: ['', Validators.required],
      employerAdd: ['', Validators.required],
      chooseMem: ['', Validators.required],
      payment: ['', Validators.required],
      paymentDateInput: ['', Validators.required],
      payment1: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      const _id = params['id'];
      this.getMemForm(_id);
    });
  }

  onChange = ($event: Event, formControlName: string) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
  
    if (file) {
      this.convertfiletobase64(file, (base64String) => {
        // Set the base64 string to the appropriate form control
        if (base64String) {
          if (formControlName === 'photo') {
            this.form.patchValue({ photo: base64String });
          } else if (formControlName === 'tertiaryDiploma') {
            this.form.patchValue({ tertiaryDiploma: base64String });
          } else if (formControlName === 'masteralDiploma') {
            this.form.patchValue({ masteralDiploma: base64String });
          } else if (formControlName === 'doctoralDiploma') {
            this.form.patchValue({ doctoralDiploma: base64String });
          } else if (formControlName === 'payment') {
            this.form.patchValue({ payment: base64String });
          }
        }
      });
    }
  };
  

  // Your convertfiletobase64 function
  convertfiletobase64(file: File, callback: (base64string: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64string = reader.result as string;
      callback(base64string);
    };
    reader.readAsDataURL(file);
}

  getMemForm(_id: string) {
    this.memForm$ = this.http.get<MemForm>(`${this.apiUrl}api/myMemForm/${_id}`);
    this.memForm$.subscribe((data) => {
      console.log('API Response:', data);
    });
  }

  submit() {
    const form = this.form.getRawValue();
    const requiredFields = [
      'photo',
      'fullName',
      'sex',
      'birthDate',
      'placeOfBirth',
      'civilStatus',
      'religion',
      'address',
      'zip',
      'email',
      'contactNum',
      'region',
      'prcNo',
      'prcDate',
      'prcExpiration',
      'studentID',
      'companyID',
      'tertiary',
      'tertiaryDegree',
      'tertiaryYear',
      'tertiaryDiploma',
      'masteral',
      'masteralDegree',
      'masteralYear',
      'masteralDiploma',
      'doctoral',
      'doctoralDegree',
      'doctoralYear',
      'doctoralDiploma',
      'employer',
      'jobTitle',
      'employerAdd',
      'specialization',
      'chooseMem',
      'payment',
      'paymentDateInput'
    ]
    
    const anyRequiredFieldFilled = requiredFields.some(field => form[field]);
    const allRequiredFieldsEmpty = requiredFields.every(field => !form[field]);
    if (anyRequiredFieldFilled && !allRequiredFieldsEmpty) {
      this.route.params.subscribe((params) => {
        const _id = params['id'];
  
        const membershipApplication = this.form.getRawValue();
  
        // Fetch organization details
        this.http.get(`${this.apiUrl}api/member`, {
          withCredentials: true,
        }).subscribe(
          (memResponse: any) => {
            console.log('Mem Response:', memResponse, membershipApplication);
            Swal.fire('Success', 'You have submitted your membership form to the organization');
  
            // Extract organization ID from the response
            const memID = memResponse._id;
  
            // Create an object with organization ID and event data
            const memApplicationData = {
              memID: memID,
              orgID: _id,
              photo: membershipApplication.photo1,
              remarks: membershipApplication.remarks,
              fullName: membershipApplication.fullName,
              sex: membershipApplication.sex,
              birthDate: membershipApplication.birthDate,
              placeOfBirth: membershipApplication.placeOfBirth,
              civilStatus: membershipApplication.civilStatus,
              religion: membershipApplication.religion,
              address: membershipApplication.address,
              zip: membershipApplication.zip,
              email: membershipApplication.email,
              contactNum: membershipApplication.contactNum,
              region: membershipApplication.region,
  
              prcNo: membershipApplication.prcNo,
              prcDate: membershipApplication.prcDate,
              prcExpiration: membershipApplication.prcExpiration,
              studentID: membershipApplication.studentID,
              companyID: membershipApplication.companyID,
  
              tertiary: membershipApplication.tertiary,
              tertiaryDegree: membershipApplication.tertiaryDegree,
              tertiaryYear: membershipApplication.tertiaryYear,
              tertiaryDiploma: membershipApplication.tertiaryDiploma,
              masteral: membershipApplication.masteral,
              masteralDegree: membershipApplication.masteralDegree,
              masteralYear: membershipApplication.masteralYear,
              masteralDiploma: membershipApplication.masteralDiploma,
              doctoral: membershipApplication.doctoral,
              doctoralDegree: membershipApplication.doctoralDegree,
              doctoralYear: membershipApplication.doctoralYear,
              doctoralDiploma: membershipApplication.doctoralDiploma,
              employer: membershipApplication.employer,
              jobTitle: membershipApplication.jobTitle,
              employerAdd: membershipApplication.employerAdd,
              specialization: membershipApplication.specialization,
  
              chooseMem: membershipApplication.chooseMem,
              payment: membershipApplication.payment,
              paymentDateInput: membershipApplication.paymentDateInput,
            };
  
            // Post the event data to the createEvent API endpoint
            this.http.post(`${this.apiUrl}api/membershipApplication`, memApplicationData, {
              withCredentials: true,
            }).subscribe(
              (memResponse: any) => {
                console.log('Event created successfully', memResponse);
                const successEvent = new Event('postRequestSuccess');
                document.dispatchEvent(successEvent);
                this.router.navigate([`/member-orgprofile/${_id}`]);
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (orgError) => {
            console.error('Error fetching organization details:', orgError);
          }
        );
      });
    } else {
      this.form.markAllAsTouched();
    }
 }

}
