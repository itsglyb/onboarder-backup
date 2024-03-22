import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  form!:FormGroup
  token!:string
  

  constructor(  private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}
  backToLandingPage() {
    this.router.navigate(['/home']);
  }



  ngOnInit(): void {

    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      cpassword: ['', Validators.required],

     
  }); 

    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token)
    })

}

submit(): void {
  console.log(this.form.value);
  let resetData = {
    token : this.token,
    password: this.form.value.password
  };

  this.http
    .post(`${this.apiUrl}api/reset-password`, resetData, { responseType: 'text' })
    .subscribe(
      (res: any) => {
        console.log("Response:", res);
        this.form.reset();
        Swal.fire('Success', 'Password reset successfully!', 'success');
        this.router.navigate(['/auth-login']);
      },
      (error: any) => {
        console.error("Error:", error);
        Swal.fire('Error', 'Failed to reset password. Please try again later.', 'error');
      }
    );
}

}
