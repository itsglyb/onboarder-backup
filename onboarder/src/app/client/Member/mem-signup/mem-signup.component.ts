import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-mem-signup',
  templateUrl: './mem-signup.component.html',
  styleUrls: ['./mem-signup.component.css']
})
export class MemberSignupComponent implements OnInit {
  form!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) { 

    }

  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      cpassword:"",


    })

     // Load and initialize the JavaScript file
     this.loadScript('assets/js/mem-signup.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading mem-signup.js', error);
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

  ValidateEmail = (email: any) => {
 
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {  
  
      return true;
  
    } else {
  
      return false;
  
    }
  
  }

  done(){
    this.router.navigate(['auth-login']);
  }
  
  submit() {
    let member = this.form.getRawValue()
    console.log(member)
    if(member.firstName == "" || member.lastName == "" || member.email == "" || member.password == ""){
      Swal.fire("Error", "Please fill up all the required fields.", "error")
    }
  else if(!this.ValidateEmail(member.email)){
 
    Swal.fire('Error', 'Please enter a valid email address', 'error');

  } 
  else if(member.password !== member.cpassword){
 
    Swal.fire('Error', 'Password not match', 'error');

  } 
  else {

  this.http
    .post('http://localhost:5000/api/register', member, {
      withCredentials: true,
      
    })
    .subscribe(
      () => {
        // Successful request, dispatch a custom event
        const successEvent = new Event('postRequestSuccess');
        document.dispatchEvent(successEvent);
      },
      
      (err) => {
        Swal.fire("Error", err.error.message, 'error');
      }
    );

  }
}
}



