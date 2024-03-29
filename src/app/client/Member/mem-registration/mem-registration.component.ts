import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mem-registration',
  templateUrl: './mem-registration.component.html',
  styleUrls: ['./mem-registration.component.css']
})
export class MemRegistrationComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  videoUrl: string = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
  eventInfo: any[] = [];
  eventSeats: number = 0; // Initialize eventSeats property

  constructor (
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const _id = params['id'];
      this.getEventInfo(_id);
    });
  }

  getEventInfo(_id: string) {
    this.http.get(`${this.apiUrl}api/thisevent/${_id}`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.eventInfo = [resultData];
      // Set the value of eventSeats property
      this.eventSeats = resultData.eventSeats;
    });
  }

  getTrustedUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  redirecttoRegForm(orgName: string, _id: string){
    this.router.navigate(['/member-event-regform', orgName, _id]);
  }

  isNoSeatsLeft(): boolean {
    // Check if eventSeats is 0
    return this.eventSeats == 0;
  }
  backToEvents() {
    this.router.navigate(['/member-events']);
  }

  isEventDatePassed(eventDate: Date): boolean {
    const eventDateTime = new Date(eventDate); 
    const today = new Date();
    return eventDateTime < today;
  }
}
