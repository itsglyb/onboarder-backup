import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    { label: 'Registration Forn', url: '/regform' },
    { label: 'Post Event', url: '/post-event' }
  ];

  orgEventArray: OrgEvent[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orgID = params['orgID'];
      this.getOrgEvent(orgID);
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

  redirecttoEventDetails(orgID: string, _id: string){
    this.router.navigate(['/org-event-details', orgID, _id]);
  }

  showNavLinks = false;

  toggleNavLinks() {
    this.showNavLinks = !this.showNavLinks;
  }
}
