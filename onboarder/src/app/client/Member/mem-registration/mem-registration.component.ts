import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mem-registration',
  templateUrl: './mem-registration.component.html',
  styleUrls: ['./mem-registration.component.css']
})
export class MemRegistrationComponent implements OnInit {
  videoUrl: string = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
  eventInfo: any[] = [];

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
    })
  }

  getEventInfo(_id: string) {
    this.http.get(`http://localhost:5000/api/thisevent/${_id}`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.eventInfo = [resultData];
    })
  }

  getTrustedUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  redirecttoRegForm(orgName: string, _id: string){
    this.router.navigate(['/member-event-regform', orgName, _id]);
  }
}
