import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-create-event',
  templateUrl: './org-create-event.component.html',
  styleUrls: ['./org-create-event.component.css']
})


export class OrgCreateEventComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
  ) {}
  form!: FormGroup
  activeButton: number = 1; // Default to Button 1 active state
  isSmallScreen = false;
  isSideNavOpen = true;

  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;
  isStep4Valid = false;

  onButtonClicked(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }


    ngOnInit(): void {
      this.form = this.formBuilder.group({
        eventTitle: ['', Validators.required],
        eventDesc: ['', Validators.required],
        eventDate : ['', Validators.required],
        eventTime: ['', Validators.required],
        location: ['', Validators.required],
        meetingURL: ['', Validators.required],
        poster: ['', Validators.required],
        programme: ['', Validators.required],
        video: ['', Validators.required],
        eventSeats: ['', Validators.required],
        eventPrice: ['', Validators.required],
        eventPaymentDetails: ['', Validators.required]
      })

      this.isStep1Valid = true;
      this.isStep2Valid = true;
      this.isStep3Valid = true;
      this.isStep4Valid = true;
      // Load and initialize the JavaScript file
      this.loadScript('assets/js/createevent.js').then(() => {
        // The JavaScript file is loaded and initialized
      }).catch(error => {
        console.error('Error loading createeventphotoupload.js', error);
      });
    }
  
    validateStep1(){
      const event = this.form.getRawValue();
      if (
        event.eventTitle === "" ||
        event.eventDesc === "" ||
        event.eventDate === "" ||
        event.eventTime === ""
      ){
        Swal.fire("Error", "Please fill up all the required fields in Step 1", "error");
        this.isStep1Valid = false;
      }
      else {
        this.isStep1Valid = true;
      }
    }

    validateStep2(){
      this.isStep2Valid = true;
    }

    validateStep3(){
      const event = this.form.getRawValue();
      if (
        event.eventSeats === "" ||
        event.eventPrice === "" ||
        event.eventPaymentDetails === ""
      ) {
        Swal.fire("Error", "Please fill up all the required fields in Step 3", "error");
        this.isStep3Valid = false;
      }
      else {
        this.isStep3Valid = true;
      }
    }

    validateStep4(){
      this.isStep4Valid = true;
    }

    onChange = ($event: Event, controlName: string) => {
      const target = $event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
  
      this.convertfiletobase64(file, (base64String) => {
          // Set the base64 string to the appropriate form control
          if (controlName === 'poster') {
              this.form.patchValue({ poster: base64String });
          } else if (controlName === 'programme') {
              this.form.patchValue({ programme: base64String });
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

    submit() {
      // Get the event data from the form
      const event = this.form.getRawValue();
      // Fetch organization details
      this.http.get('http://localhost:5000/api/organization', {
        withCredentials: true
      }).subscribe(
        (orgResponse: any) => {
          console.log('Org Response:', orgResponse, event);
    
          // Extract organization ID from the response
          const orgID = orgResponse._id;
          const orgName = orgResponse.orgName;
          
          // Assuming the organization ID is stored in the "_id" field
    
          // Create an object with organization ID and event data
          const eventData = {
            orgID: orgID,
            orgName: orgName,
            eventTitle: event.eventTitle,
            eventDesc: event.eventDesc,
            eventDate: event.eventDate,
            eventTime: event.eventTime,
            location: event.location,
            meetingURL: event.meetingURL,
            poster: event.poster,
            programme: event.programme,
            video: event.video,
            eventSeats: event.eventSeats,
            eventPrice: event.eventPrice,
            eventPaymentDetails: event.eventPaymentDetails
          };          
    
          // Post the event data to the createEvent API endpoint
          this.http.post('http://localhost:5000/api/createEvent', eventData, {
            withCredentials: true
          }).subscribe(
            (eventResponse: any) => {
              console.log('Event created successfully', eventResponse)
              const successEvent = new Event('postRequestSuccess');
              document.dispatchEvent(successEvent);
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
    }

    done(){
      this.router.navigate(['/org-profile']);
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
  

