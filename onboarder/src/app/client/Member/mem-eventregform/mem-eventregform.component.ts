import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mem-eventregform',
  templateUrl: './mem-eventregform.component.html',
  styleUrls: ['./mem-eventregform.component.css']
})
export class MemEventregformComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  orgID!:string;
  eventID!:string;
  orgName!:string;
  form!: FormGroup
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      memName: ['', Validators.required],
      memType: ['', Validators.required],
      proofofPayment: ['', Validators.required],
      emailAddress: ['', Validators.required],
      contactno: ['', Validators.required]
    })
    this.route.params.subscribe(params => {
      this.eventID = params['id'];
      this.orgName = params['orgName'];
    });
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.convertfiletobase64(file, (base64String) => {
        // Set the base64 string to the appropriate form control
        this.form.get('proofofPayment')?.setValue(base64String);
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

  submit(){
    const regForm = this.form.getRawValue();
    
    this.http.get(`http://localhost:5000/api/thisevent/${this.eventID}`, {
              withCredentials: true
            }).subscribe(
              (event: any) => {
                this.http.get('http://localhost:5000/api/member', {
          withCredentials: true
        }).subscribe(
          (memberRes: any) => {

            const orgID = event.orgID;
            const orgName = event.orgName;
            const eventID = event._id;
            const memID = memberRes._id;

            const regFormData = {
              orgID: orgID,
              orgName: orgName,
              eventID: eventID,
              memID: memID,
              memName: regForm.memName,
              memType: regForm.memType,
              proofofPayment: regForm.proofofPayment,
              emailAddress: regForm.emailAddress,
              contactno: regForm.contactno
            };

            this.http.post('http://localhost:5000/api/createRegForm', regFormData, {
              withCredentials: true
            }).subscribe(
              (regFormResponse: any) => {
                console.log('Registered successfully to the event', regFormResponse);
                Swal.fire("Success", "You are registered to the event!")

                this.form.reset();
              },
              (err) => {
                console.log(err);
              }
            )
          }
        )
              }
            )
  }
  
  
}
