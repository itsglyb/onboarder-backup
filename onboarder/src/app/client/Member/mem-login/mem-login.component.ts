import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

interface ServerResponse {
  userType: string;
  // You can add other properties received from the server if needed
}
@Component({
  selector: 'app-mem-login',
  templateUrl: './mem-login.component.html',
  styleUrls: ['./mem-login.component.css']
})
export class MemLoginComponent implements OnInit{
  form!: FormGroup;
  userType!:string;
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:"",
      password:""

    })

  }
  togglePassword(): void {
    const passwordInput = document.getElementById('form3Example4') as HTMLInputElement;
    const passwordIcon = document.querySelector('.toggle-password') as HTMLElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordIcon.classList.remove('fa-eye');
      passwordIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      passwordIcon.classList.remove('fa-eye-slash');
      passwordIcon.classList.add('fa-eye');
    }
  }

  ValidateEmail = (email: any) => {
 
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {  
  
      return true;
  
    } else {
  
      return false;
  
    }

  }
    submit(): void{
    
  
      let member = this.form.getRawValue()
      console.log(member)
      if( member.email == "" || member.password == ""){
        Swal.fire("Error", "Please fill up all the required fields.", "error")
      }
    else if(!this.ValidateEmail(member.email)){
   
      Swal.fire('Error', 'Please enter a valid email address', 'error');
  
    } else {
  
    this.http
      .post('http://localhost:5000/api/login', member, {
        withCredentials: true,
        
      })
      .subscribe(
        (res: any) => {
          this.http.get('http://localhost:5000/api/current', { withCredentials: true })
            .subscribe(
              (userData: any) => {
                if (userData.userType === 'member') {
                  this.router.navigate(['/member-profile']);
                } else if (userData.userType === 'organization') {
                  this.router.navigate(['/org-profile']);
                } else if (userData.userType === 'admin') {
                  this.router.navigate(['/admin-users']);
                }else {
                  // Handle other user types or navigate to appropriate pages
                }
              },
              (err) => {
                Swal.fire('Error', err.error.message, 'error');
              }
            );
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
  
      );
  
  }
}
backToLandingPage() {
  this.router.navigate(['/home']);
}
}