import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, catchError, tap } from 'rxjs';
declare var $: any;

interface OrgEvent {
  _id: string,
  orgID: string,
  eventTitle: string;
  eventDesc: string;
  eventDate: Date;
  eventTime: string;
  location: string;
  meetingURL: string;
  poster: string;
  programme: string;
  video: string;
  eventSeats: string;
  eventPrice: string;
  eventPaymentDetails: string;
}

@Component({
  selector: 'app-guest-events-listing',
  templateUrl: './guest-events-listing.component.html',
  styleUrls: ['./guest-events-listing.component.css']
})
export class GuestEventsListingComponent implements OnInit {
  eventDesc!: string;
  poster!: string;
  memID: string = ""; // Initialize memID property

  constructor(private router: Router, private renderer2: Renderer2, private el: ElementRef, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) {
  }
  
  orgEventArray: OrgEvent[] = [];
  form!: FormGroup;
  orgEvent$: Observable<OrgEvent[]> | undefined;
  orgID!: string;
  orgName!:string;
  eventID!: string;
  eventTitle!:string;
  memType: string = 'Guest'; // Declare and initialize memType here

  ngOnInit(): void {
    const n = "#nav";
    const no = ".nav-items";
    this.route.params.subscribe(params => {
      this.orgID = params['orgID'];
      this.eventID = params['_id'];
      this.orgName = params['orgName'];
      this.eventTitle = params['eventTitle'];
      this.memType;
      this.getOrgEvent(this.orgID);
      this.getMemberID(); // Call function to get memID
    })

    this.form = this.formBuilder.group({
      memName: ['', Validators.required],
      memType: ['', Validators.required],
      proofofPayment: ['', Validators.required],
      emailAddress: ['', Validators.required],
      contactno: ['', Validators.required]
    });

    $(n).click(() => {
      const noElement = this.el.nativeElement.querySelector(no);

      if ($(noElement).hasClass("nav-open")) {
        $(noElement).animate({ height: 0 }, 300);
        setTimeout(() => {
          $(noElement).removeAttr('style').removeClass("nav-open");
        }, 320);
      } else {
        const h = $(noElement).css("height", "auto").height();
        $(noElement).height(0).animate({ height: h }, 300);
        setTimeout(() => {
          $(noElement).removeAttr('style').addClass("nav-open");
        }, 320);
      }
    });
  }

  getOrgEvent(orgID: string) {
    this.orgEvent$ = this.http.get<OrgEvent[]>(`http://localhost:5000/api/events/${orgID}`);
    this.orgEvent$.subscribe((data) => {
      this.orgEventArray = data;
      // Update the length variable
      console.log('Organization Events:', data);
    });
  }

  showModalAfterDelay(eventID: string, poster: string, eventTitle: string) {
    this.showSusbcFormModal(eventID, poster, eventTitle);
}

  
  showSusbcFormModal(eventID: string, poster: string, eventTitle: string) {
    const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
    this.eventID = eventID;
    this.poster = poster; // Set the eventID property of the component
    this.eventTitle = eventTitle;
    $(susbcFormModal).modal('show');
}

  
  onSubmitForm(e: Event) {
    e.preventDefault();
  
    const subsForm = this.el.nativeElement.querySelector('#subs-form');
    const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
    const susbcFormThankModal = this.el.nativeElement.querySelector('#susbc-form-thank');
    
    const regForm = this.form.getRawValue();
    const formData = {
        orgID: this.orgID,
        orgName: this.orgName,
        eventID: this.eventID,
        memID: this.memID, // Use the memID obtained previously
        memName: regForm.memName,
        memType: regForm.memType,
        proofofPayment: regForm.proofofPayment,
        emailAddress: regForm.emailAddress,
        contactno: regForm.contactno
    };
    console.log("Response:", formData);

    // Call getMemberID to ensure memID is fetched before registering
    this.getMemberID().subscribe(() => {
      // Send the form data to the backend
      this.registerToEvent(formData);
  
      // Reset form
      $(subsForm).trigger('reset');
    
      // Hide form modal and show thank you modal
      $(susbcFormModal).modal('hide');
      $(susbcFormThankModal).modal('show');
    });
  }

  registerToEvent(formData: any) {
    this.http.post('http://localhost:5000/api/createRegForm', formData, { withCredentials: true }).subscribe(
        () => {
            const subsForm = this.el.nativeElement.querySelector('#subs-form');
            const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
            const susbcFormThankModal = this.el.nativeElement.querySelector('#susbc-form-thank');
  
            $(subsForm).trigger('reset');
  
            // Hide form modal and show thank you modal
            $(susbcFormModal).modal('hide');
            $(susbcFormThankModal).modal('show');
        },
        (err) => {
            console.error('Error registering to the event:', err);
            // Handle the error here
        }
    );
}

  getMemberID(): Observable<any> {
    // Make HTTP request to fetch memID
    return this.http.get<any>('http://localhost:5000/api/member',  { withCredentials: true })
      .pipe(
        tap((response) => {
          this.memID = "Guest"; // Assuming memID is available in the response
          console.log('Member ID:', this.memID);
        }),
        catchError((error) => {
          console.error('Error fetching member ID:', error);
          throw error;
        })
      );
  }

  closeModal() {
    $('#susbc-form').modal('hide');
    $('#susbc-form-thank').modal('hide');
  }

  redirectToLogin() {
    this.router.navigate(['/auth-login']);
  }
}
