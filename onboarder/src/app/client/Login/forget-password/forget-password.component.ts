import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  backToLandingPage() {
    this.router.navigate(['/home']);
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  submit(): void {
    console.log(this.form.value);
    const member = this.form.value;
  
    this.http.post('http://localhost:5000/api/forgot-password', member)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.form.reset();
          // Display success message using SweetAlert2
          Swal.fire('Success', response, 'success');
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          // Display error message using SweetAlert2
          Swal.fire('Error', 'Failed to send email. Please try again later.', 'error');
        }
      );
  }
  
}
