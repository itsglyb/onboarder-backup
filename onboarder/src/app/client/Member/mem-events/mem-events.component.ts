import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mem-events',
  templateUrl: './mem-events.component.html',
  styleUrls: ['./mem-events.component.css']
})
export class MemEventsComponent implements OnInit {
  EventArray: any[] = [];
  searchQuery: string = '';
  @ViewChild('eventContainer') eventContainer!: ElementRef;

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

  search() {
    // If search query is empty, reset orgEventArray to show all events
    if (!this.searchQuery.trim()) {
      this.getAllEvents();
      return;
    }
  
    // Convert searchQuery to lowercase for case-insensitive search
    const searchTerm = this.searchQuery.toLowerCase();
  
    // Find index of the event that matches the search query
    const index = this.EventArray.findIndex(event => {
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