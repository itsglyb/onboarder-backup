import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

interface OrgEvent {
  _id: string,
  orgID: string,
  eventTitle: string;
  eventDesc: string;
  eventDate: Date;
  eventTime: string;
  eventType: string,
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
  memID: string = "";
  eventSeats: number = 0;// Initialize memID property
  @ViewChild('eventContainer') eventContainer!: ElementRef;
  eventTime!: string;
  location!: string;
  eventPrice!: string;
  eventPaymentDetails!: string;
  submitted: boolean = false;

  constructor(private router: Router, private renderer2: Renderer2, private el: ElementRef, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) {
  }

  orgEventArray: OrgEvent[] = [];
  form!: FormGroup;
  orgEvent$: Observable<OrgEvent[]> | undefined;
  orgID!: string;
  orgName!:string;
  eventID!: string;
  eventTitle!:string;
  eventInfo: any[] = [];
  searchQuery: string = '';// Declare and initialize memType here

  ngOnInit(): void {
    const n = "#nav";
    const no = ".nav-items";
    this.route.params.subscribe(params => {
      this.orgID = params['orgID'];
      this.eventID = params['_id'];
      this.orgName = params['orgName'];
      this.eventTitle = params['eventTitle'];
      this.getOrgEvent(this.orgID);
    })

    this.form = this.formBuilder.group({
      guestName: ['', Validators.required],
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
    this.orgEvent$ = this.http.get<OrgEvent[]>(`http://localhost:5000/api/events/${orgID}`).pipe(
      map(events => events.filter(event => event.eventType === 'Public'))
    );

    this.orgEvent$.subscribe((filteredEvents) => {
      this.orgEventArray = filteredEvents;
      // Update the length variable
      console.log('Organization Public Events:', filteredEvents);
    });
  }


  showModalAfterDelay(eventID: string, poster: string, eventTitle: string, eventSeats: number, eventTime: string, location: string, eventDesc:string, eventPrice: string, eventPaymentDetails: string) {
    this.showSusbcFormModal(eventID, poster, eventTitle, eventSeats, eventTime, location, eventDesc, eventPrice, eventPaymentDetails);
}


  showSusbcFormModal(eventID: string, poster: string, eventTitle: string, eventSeats: number, eventTime: string, location: string, eventDesc: string, eventPrice: string, eventPaymentDetails: string) {
    const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
    this.eventID = eventID;
    this.poster = poster; // Set the eventID property of the component
    this.eventTitle = eventTitle;
    this.eventSeats = eventSeats;
    this.eventTime = eventTime;
    this.location = location;
    this.eventDesc = eventDesc;
    this.eventPaymentDetails = eventPaymentDetails;
    this.eventPrice = eventPrice;
    $(susbcFormModal).modal('show');
}

onChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  this.convertfiletobase64(file, (base64String) => {
    this.form.get('proofofPayment')?.setValue(base64String);
  });
}

convertfiletobase64(file: File, callback: (base64string: string) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    let base64string = reader.result as string;
    callback(base64string);
  };
  reader.readAsDataURL(file);
}


  onSubmitForm(e: Event) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    e.preventDefault();

    const subsForm = this.el.nativeElement.querySelector('#subs-form');
    const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
    const susbcFormThankModal = this.el.nativeElement.querySelector('#susbc-form-thank');

    const regForm = this.form.getRawValue();
    const formData = {
        orgID: this.orgID,
        orgName: this.orgName,
        eventID: this.eventID,// Use the memID obtained previously
        guestName: regForm.guestName,
        proofofPayment: regForm.proofofPayment,
        emailAddress: regForm.emailAddress,
        contactno: regForm.contactno
    };
    console.log("Response:", formData);

    this.http.get(`http://localhost:5000/api/thisevent/${this.eventID}`, { withCredentials: true }).subscribe(
      (event: any) => {
        const updatedSeats = event.eventSeats - 1;
        event.eventSeats = updatedSeats;
        this.http.patch(`http://localhost:5000/api/event/${this.eventID}`, event, { withCredentials: true }).subscribe(
          () => {
            this.registerToEvent(formData);
          },
          (updateError) => {
            console.error('Error updating event seats:', updateError);
          }
        );
      },
      (eventError) => {
        console.error('Error fetching event details:', eventError);
      }
    );
  }

  registerToEvent(formData: any) {
    this.http.post('http://localhost:5000/api/createguestRegForm', formData, { withCredentials: true }).subscribe(
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

search() {
  // If search query is empty, reset orgEventArray to show all events
  if (!this.searchQuery.trim()) {
    this.getOrgEvent(this.orgID);
    return;
  }

  // Convert searchQuery to lowercase for case-insensitive search
  const searchTerm = this.searchQuery.toLowerCase();

  // Find index of the event that matches the search query
  const index = this.orgEventArray.findIndex(event => {
    return event.eventTitle.toLowerCase().includes(searchTerm);
  });

  if (index !== -1) {
    // Scroll to the corresponding card
    this.scrollToEventCard(index);
  }
}

scrollToEventCard(index: number) {
  const eventCard = this.eventContainer.nativeElement.querySelectorAll('.event')[index];
  if (eventCard) {
    eventCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


  closeModal() {
    $('#susbc-form').modal('hide');
    $('#susbc-form-thank').modal('hide');
  }

  redirectToLogin() {
    this.router.navigate(['/auth-login']);
  }

  backToOrgsPage() {
    this.router.navigate(['/guestEvents']);
  }
}
