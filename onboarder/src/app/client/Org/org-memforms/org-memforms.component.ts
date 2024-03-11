import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


interface MemForm {
orgID: string;
photo: boolean,

  personalInfo: boolean,
  fullName: boolean,
  sex: boolean,
  birthDate: boolean,
  placceOfBirth : boolean,
  civilStatus: boolean,
  religion: boolean,
  address: boolean,
  zip: boolean,
  email: boolean,
  contactNum: boolean,
  facebook: boolean,
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
}

@Component({
  selector: 'app-org-memforms',
  templateUrl: './org-memforms.component.html',
  styleUrls: ['./org-memforms.component.css']
})
export class OrgMemformsComponent implements OnInit {

  memForm: MemForm | null = null;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getMemForm();
    this.form = this.formBuilder.group({
      photo: new FormControl(false),
      fullName: new FormControl(false),
      sex: new FormControl(false),
      personalInfo: new FormControl(false),
      birthDate: new FormControl(false),
      placeOfBirth : new FormControl(false),
      civilStatus: new FormControl(false),
      religion: new FormControl(false),
      address: new FormControl(false),
      zip: new FormControl(false),
      email: new FormControl(false),
      contactNum: new FormControl(false),
      facebook: new FormControl(false),
      linkedIn: new FormControl(false),
      skype: new FormControl(false),
      zoom: new FormControl(false),
      idLicense: new FormControl(false),
      prcNo : new FormControl(false),
      prcDate: new FormControl(false),
      prcExpiration: new FormControl(false),
      studentID: new FormControl(false),
      aviation: new FormControl(false),
      caap: new FormControl(false),
      taxID: new FormControl(false),
      EducAttainment: new FormControl(false),
      tertiary: new FormControl(false),
      tertiaryDegree: new FormControl(false),
      tertiaryYear: new FormControl(false),
      tertiaryDiploma : new FormControl(false),
      masteral: new FormControl(false),
      masteralDegree: new FormControl(false),
      masteralYear: new FormControl(false),
      masteralDiploma: new FormControl(false),
      doctoral: new FormControl(false),
      doctoralDegree: new FormControl(false),
      doctoralYear: new FormControl(false),
      doctoralDiploma: new FormControl(false),
      employmentDetails: new FormControl(false),
      employer: new FormControl(false),
      jobTitle: new FormControl(false),
      employerAdd: new FormControl(false),
      membership: new FormControl(false),
      memType1: new FormControl(false),
      memType2: new FormControl(false),
      memType3: new FormControl(false),
      memType1Details: new FormControl(false),
      memType2Details: new FormControl(false),
      memType3Details: new FormControl(false),
      memType1Fee: new FormControl(false),
      memType2Fee: new FormControl(false),
      memType3Fee: new FormControl(false),
      memType1Process: new FormControl(false),

      payment: new FormControl(false),

      memType1Input: [''],
      memType2Input: [''],
      memType3Input: [''],
      memType1DetailsInput: [''],
      memType2DetailsInput: [''],
      memType3DetailsInput: [''],
      memType1FeeInput: [''],
      memType2FeeInput: [''],
      memType3FeeInput: [''],
      memType1ProcessInput: [''],

    });

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/checkbox-function.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading checkbox-function.js', error);
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

  getMemForm(): void {
    this.http.get<MemForm>('http://localhost:5000/api/memForm', { withCredentials: true })
      .subscribe(
        (resultData: MemForm) => {
          console.log(resultData);
          this.memForm = resultData;

          // Check if orgID is present in the memForm object
          if (this.memForm && this.memForm.orgID) {
            // Populate the form controls with the received data
            this.form.patchValue(resultData);

            // Access orgID and perform operations dependent on it here
            console.log('orgID:', this.memForm.orgID);
          } else {
            console.error('orgID not found in the API response.');
          }
        },
        (error) => {
          console.error('Error occurred during API call:', error);
        }
      );
  }


  submit()  {
     const formData = {
      ...this.form.value,
      orgID: this.memForm?.orgID
    };

    console.log('orgID:', this.memForm?.orgID);

    this.http.patch(`http://localhost:5000/api/customizeForm/${this.memForm?.orgID}`, formData, { withCredentials: true })
    .subscribe(
      (response: any) => {

        console.log(response);
        Swal.fire('Changes to Membership Form has been saved.')

        // this.router.navigate(['/org-profile']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  memCatForm: FormGroup = new FormGroup({
    memCatList: new FormArray([this.getmemCatFields()])
  });

  getmemCatFields(): FormGroup {
    return new FormGroup({
      memType: new FormControl(''),
      memTypeDetails: new FormControl(''),
      memTypeFee: new FormControl(''),
    });
  }

  memCatList() {
    return (this.memCatForm.get('memCatList') as FormArray).controls;
  }

  addmemCatField() {
    (this.memCatForm.get('memCatList') as FormArray).push(this.getmemCatFields());
  }

  deleteMemCatField(index: number) {
    (this.memCatForm.get('memCatList') as FormArray).removeAt(index);
  }
}
