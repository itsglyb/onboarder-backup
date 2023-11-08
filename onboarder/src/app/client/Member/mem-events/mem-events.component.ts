import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mem-events',
  templateUrl: './mem-events.component.html',
  styleUrls: ['./mem-events.component.css']
})
export class MemEventsComponent implements OnInit {
  EventArray: any[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {
    this.getAllEvents();
  }
  ngOnInit(): void {
    this.getAllEvents();

        // Load and initialize the JavaScript file
        this.loadScript('assets/js/mem-org.js').then(() => {
          // The JavaScript file is loaded and initialized
        }).catch(error => {
          console.error('Error loading mem-org.js', error);
        });
  }

  getAllEvents() {
    this.http.get('http://localhost:5000/api/member', {
      withCredentials: true
    }).subscribe(
      (memResponse: any) => {
        const memID = memResponse._id;
  
        this.http.get(`http://localhost:5000/api/myEvents/${memID}`, {
          withCredentials: true
        }).subscribe((resultData: any) => {
          console.log(resultData);
          this.EventArray = resultData;
        });
      },
      error => {
        console.error(error);
        // Handle errors from the first request if necessary
      }
    );
  }

  redirecttoEventDetails(orgID: string, _id: string){
    this.router.navigate(['/member-event-details', orgID, _id]);
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