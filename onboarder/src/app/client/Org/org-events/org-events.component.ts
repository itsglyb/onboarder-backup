import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

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
  providers: [DatePipe],
  selector: 'app-org-events',
  templateUrl: './org-events.component.html',
  styleUrls: ['./org-events.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrgEventsComponent implements OnInit {
  orgEvent$: Observable<OrgEvent[]> | undefined;
  orgEventArrayLength: number = 0;
  links = [
    { label: 'Basic Info', url: '/basic-info' },
    { label: 'Details', url: '/details' },
    { label: 'Tickets', url: '/tickets' },
    { label: 'Registration Form', url: '/regform' },
    { label: 'Post Event', url: '/post-event' }
  ];

  orgEventArray: OrgEvent[] = [];
  orgID!: string;
  _id = "";
  eventTitle = "";
  eventDesc = "";
  eventDate: string | null = "";
  eventTime = "";
  location = "";
  meetingURL = "";
  poster = "";
  programme = "";
  video = "";
  eventSeats = "";
  eventPrice = "";
  eventPaymentDetails = "";
  searchQuery: string = '';
  @ViewChild('eventContainer') eventContainer!: ElementRef;


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orgID = params['orgID'];
      this.getOrgEvent(this.orgID);
    })
  }

  getOrgEvent(orgID: string) {
    this.orgEvent$ = this.http.get<OrgEvent[]>(`http://localhost:5000/api/events/${orgID}`);
    this.orgEvent$.subscribe((data) => {
      this.orgEventArray = data;
      // Update the length variable
      console.log('Organization Events:', data);
    });
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertfiletobase64(file, (base64String) => {
      // Set the base64 string to the logo form control
      this.poster = base64String;
      this.programme = base64String;
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

  setUpdate(data:any) {
    this._id = data._id;
    this.eventTitle = data.eventTitle;
    this.eventDesc = data.eventDesc;
    this.eventDate = data.eventDate;
    this.eventTime = data.eventTime; // Keep the original time value
    this.location = data.location;
    this.meetingURL = data.meetingURL;
    this.poster = data.poster;
    this.programme = data.programme;
    this.video = data.video;
    this.eventSeats = data.eventSeats;
    this.eventPrice = data.eventPrice;
    this.eventPaymentDetails = data.eventPaymentDetails;
  
    // Convert time to AM/PM format
    const timeSplit = this.eventTime.split(':');
    const hour = parseInt(timeSplit[0]);
    const minute = parseInt(timeSplit[1]);
    const ampm = (hour >= 12) ? 'PM' : 'AM';
    this.eventTime = ((hour % 12) || 12) + ':' + ('0' + minute).slice(-2) + ' ' + ampm;
  }
  

  updateEvent() {
    let eventData = {
      "_id": this._id,
      "eventTitle": this.eventTitle,
      "eventDesc": this.eventDesc,
      "eventDate": this.eventDate,
      "eventTime": this.eventTime,
      "location": this.location,
      "meetingURL": this.meetingURL,
      "poster": this.poster,
      "video": this.video,
      "eventSeats": this.eventSeats,
      "eventPrice": this.eventPrice,
      "eventPaymentDetails": this.eventPaymentDetails
    };
  
    this.http.patch(`http://localhost:5000/api/event/${this._id}`, eventData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.route.params.subscribe(params => {
          const orgID = params['orgID'];
          this.getOrgEvent(orgID); 
          this.redirecttoEventDetails(orgID, this._id);// Use orgID here
        });
      },
      (error) => {
        console.error('Error updating event:', error);
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
    const eventCard = this.eventContainer.nativeElement.querySelectorAll('.card')[index];
    if (eventCard) {
      eventCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  redirecttoEventDetails(orgID: string, _id: string){
    this.router.navigate(['/org-event-details', orgID, _id]);
  }

  showNavLinks = false;

  toggleNavLinks() {
    this.showNavLinks = !this.showNavLinks;
  }
}
