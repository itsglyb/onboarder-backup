import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrls: ['./org-registration.component.css']
})
export class OrgRegistrationComponent implements OnInit {
  
  form!:FormGroup
  orgCode: string | undefined;
  logo!:Observable<any>


  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;
  isStep4Valid = false;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      orgName: ['', Validators.required],
      orgType: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      about: ['', Validators.required],
      orgHistory: ['', Validators.required],
      mission: ['', Validators.required],
      vision: ['', Validators.required],
      coreValues: ['', Validators.required],
      logo: ['', Validators.required],
      orgCode: ['', Validators.required]
  });

  this.isStep1Valid = true;
  this.isStep2Valid = true;
  this.isStep3Valid = true;
  this.isStep4Valid = true;

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/org-reg.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading org-reg.js', error);
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

  
  // function to handle file changes
onChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  this.convertfiletobase64(file, (base64String) => {
    // Set the base64 string to the logo form control
    this.form.get('logo')?.setValue(base64String);
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

makeRandomCode(lengthOfCode: number, possible: string) {
  let text="";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}




  ValidateEmail = (email: any) => {
 
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {  
  
      return true;
  
    } else {
  
      return false;
  
    }
  
  }

  validateStep1() {
    const organization = this.form.getRawValue();
    if (organization.orgName === "" || organization.orgType === "" || organization.about === "" || organization.orgHistory === "") {
      Swal.fire("Error", "Please fill up all the required fields in Step 1.", "error");
      this.isStep1Valid = false;
    } else {
      this.isStep1Valid = true;
    }
  }



  validateStep2() {
    const organization = this.form.getRawValue();
    if (organization.mission === "" || organization.vision === "" || organization.coreValues === "") {
      Swal.fire("Error", "Please fill up all the required fields in Step 2.", "error");
      this.isStep2Valid = false;
    } else {
      this.isStep2Valid = true;
    }
  }


  validateStep4() {
      this.isStep4Valid = true;
    }

    validateStep3() {
      this.isStep3Valid = true;
    }
  

  submit() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwxyz123456789"
    const lengthOfCode = 8;
    const result = this.makeRandomCode(lengthOfCode, possible);
    this.form.get('orgCode')?.setValue(result);
    let organization = this.form.getRawValue()
    console.log(organization)
    if(organization.email == "" || organization.password == ""){
      Swal.fire("Error", "Please fill up all the required fields.", "error")
    }
  else if(!this.ValidateEmail(organization.email)){
 
    Swal.fire('Error', 'Please enter a valid email address', 'error');

  } 

  else if(organization.password !== organization.cpassword){
 
    Swal.fire('Error', 'Password not match', 'error');

  } 
  
  else {

    this.http.post('http://localhost:5000/api/orgRegister', organization, {
  withCredentials: true,
}).subscribe(
  (orgResponse: any) => {
    
    console.log('Org Registration Response:', orgResponse);
    

    const orgID = orgResponse.orgID; // Get the organization ID from the response
    
    // Use the orgID when creating the membership form
    const membershipForm = {
      orgID: orgID,
    };

    this.http.post('http://localhost:5000/api/createForm', membershipForm, {
      withCredentials: true,
    }).subscribe(
      () => {
        // Membership form created successfully
        const successEvent = new Event('postRequestSuccess');
        document.dispatchEvent(successEvent);
      },
      (err) => {
        Swal.fire("Error", err.error.message, 'error');
      }
    );
  },
  (err) => {
    Swal.fire("Error", err.error.message, 'error');
  }
);

    }
  }
  done(){
    this.router.navigate(['auth-login']);
  }
}
