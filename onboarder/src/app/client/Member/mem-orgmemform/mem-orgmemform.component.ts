import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import Swal from 'sweetalert2';

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
      memType2: boolean,
      memType3: boolean,
      memType1Details: boolean,
      memType2Details: boolean,
      memType3Details: boolean,
      memType1Fee: boolean,
      memType2Fee: boolean,
      memType3Fee: boolean,
      memType1Process: boolean,
      memType1Input: String,
      memType2Input: String,
      memType3Input: String,
      memType1DetailsInput: String,
      memType2DetailsInput: String,
      memType3DetailsInput: String,
      memType1FeeInput: String,
      memType2FeeInput: String,
      memType3FeeInput: String,
      memType1ProcessInput: String,
}

@Component({
  selector: 'app-mem-orgmemform',
  templateUrl: './mem-orgmemform.component.html',
  styleUrls: ['./mem-orgmemform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemOrgmemformComponent implements OnInit {
  memForm$: Observable<MemForm> | undefined;
  form!:FormGroup


  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      
      photo: "",
      photo1: "",
      remarks:"",
    fullName: "",
    sex: null,
    birthDate: "",
    placeOfBirth : "",
    civilStatus: "",
    religion: "",
    address: "",
    zip: "",
    email: "",
    contactNum: "",
    facebook: "",
      linkedIn: "",
      skype: "",
      zoom: "",
      prcNo : "",
      prcDate: "",
      prcExpiration: "",
      studentID: "",
      aviation: "",
      caap: "",
      taxID: "",
      tertiary: "",
      tertiaryDegree: "",
      tertiaryYear: "",
      tertiaryDiploma : "",
      tertiaryDiploma1: "",
      masteral: "",
      masteralDegree: "",
      masteralYear: "",
      masteralDiploma: "",
      masteralDiploma1: "",
      doctoral: "",
      doctoralDegree: "",
      doctoralYear: "",
      doctoralDiploma: "",
      doctoralDiploma1: "",
      employer: "",
      jobTitle: "",
      employerAdd: "",
      chooseMem: "",
      payment: "",
      payment1: ""


    })

    

    this.route.params.subscribe(params => {
      const _id = params['id'];
      this.getMemForm(_id);
     });

    
  }

  onChange = ($event: Event, controlName: string) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.convertfiletobase64(file, (base64String) => {
        // Set the base64 string to the appropriate form control
        if (controlName === 'photo1') {
            this.form.patchValue({ photo: base64String });
        } else if (controlName === 'tertiaryDiploma1') {
            this.form.patchValue({ tertiaryDiploma: base64String });
        }
        else if (controlName === 'masteralDiploma1') {
          this.form.patchValue({ masteralDiploma : base64String})
        }
        else if (controlName === 'doctoralDiploma1') {
          this.form.patchValue({ doctoralDiploma : base64String})
        }
        else if (controlName === 'payment1') {
          this.form.patchValue({ payment : base64String})
        }
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

  getMemForm(_id: string) {
    this.memForm$ = this.http.get<MemForm>(`http://localhost:5000/api/myMemForm/${_id}`);
    this.memForm$.subscribe(data => {
      console.log('API Response:', data);
    });

    
  }

  submit() {
    // Get the event data from the form
    
    this.route.params.subscribe(params => {
      const _id = params['id'];

      const membershipApplication = this.form.getRawValue();
      // Fetch organization details
      this.http.get('http://localhost:5000/api/member', {
        withCredentials: true
      }).subscribe(
        (memResponse: any) => {
          console.log('Mem Response:', memResponse, membershipApplication);
          Swal.fire("Success", "You have submitted your membership form to the organization")
          // Extract organization ID from the response
          const memID = memResponse._id;
          
          
    
          // Create an object with organization ID and event data
          const memApplicationData = {

            memID: memID,
            orgID : _id,
            photo: membershipApplication.photo,
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
        facebook: membershipApplication.facebook,
        linkedIn : membershipApplication.linkedIn,
        skype : membershipApplication.skype,
        zoom : membershipApplication.zoom,
        prcNo : membershipApplication.prcNo,
        prcDate : membershipApplication.prcDate,
        prcExpiration : membershipApplication.prcExpiration,
        studentID : membershipApplication.studentID,
        aviation : membershipApplication.aviation,
        caap : membershipApplication.caap,
        taxID : membershipApplication.taxID,
        tertiary : membershipApplication.tertiary,
        tertiaryDegree : membershipApplication.tertiaryDegree,
        tertiaryYear : membershipApplication.tertiaryYear,
        tertiaryDiploma : membershipApplication.tertiaryDiploma,
        masteral : membershipApplication.masteral,
        masteralDegree : membershipApplication.masteralDegree,
        masteralYear : membershipApplication.masteralYear,
        masteralDiploma : membershipApplication.masteralDiploma,
        doctoral : membershipApplication.doctoral,
        doctoralDegree : membershipApplication.doctoralDegree,
        doctoralYear : membershipApplication.doctoralYear,
        employer : membershipApplication.employer,
        jobTitle : membershipApplication.jobTitle,
        employerAdd : membershipApplication.employerAdd,
        chooseMem :membershipApplication.chooseMem,
        payment : membershipApplication.payment,
          };          
    
          // Post the event data to the createEvent API endpoint
          this.http.post('http://localhost:5000/api/membershipApplication', memApplicationData, {
            withCredentials: true
          }).subscribe(
            (memResponse: any) => {
              console.log('Event created successfully', memResponse)
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

   
  }

 
  

   
  
  
}
