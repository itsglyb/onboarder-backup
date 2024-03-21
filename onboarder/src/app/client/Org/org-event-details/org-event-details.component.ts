  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Observable } from 'rxjs';import { PaginationInstance } from 'ngx-pagination';
  import { environment } from 'src/environments/environment';


  interface regForm {
    _id: string,
    orgID: string,
    orgName: string,
    memID: string,
    memName: string,
    memType: string,
    proofofPayment: string,
    emailAddress: string,
    contactno: string,
  }

  interface guestregForm {
    _id: string,
    orgID: string,
    orgName: string,
    guestName: string,
    proofofPayment: string,
    emailAddress: string,
    contactno: string,
  }


  @Component({
    selector: 'app-org-event-details',
    templateUrl: './org-event-details.component.html',
    styleUrls: ['./org-event-details.component.css']
  })
  export class OrgEventDetailsComponent implements OnInit {
    private apiUrl = environment.apiUrl;

    eventInfo: any[] = [];
    regMemArray: regForm[] = [];
    regMem$: Observable<regForm[]> | undefined;
    regGuestArray: guestregForm[] = [];
    regGuest$: Observable<guestregForm[]> | undefined;
    proofofPayment: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 5;
    Math: any = Math; 
    searchQuery: string = '';
    _id = "";

    constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
      private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
      this.loadScript('assets/js/triggermodal.js').then(() => {
        // The JavaScript file is loaded and initialized
      }).catch(error => {
        console.error('Error loading triggermodal.js', error);
      });
      this.route.params.subscribe(params => {
        this._id = params['id'];
        this.getEventInfo(this._id);
        this.getregMem(this._id);
        this.getregGuest(this._id);
      });
    }

    getEventInfo(_id: string) {
      this.http.get(`${this.apiUrl}api/thisevent/${_id}`)
        .subscribe((resultData: any) => {
          console.log(resultData);
          this.eventInfo = [resultData]; // Store all event information
        });
    }

  
    openImage(data: any) {
      this.proofofPayment = data.proofOfPayment;
    }

    getregMem(eventID: string) {
      this.regMem$ = this.http.get<regForm[]>(`${this.apiUrl}api/myEventForm/${eventID}`);
      this.regMem$.subscribe((data) => {
        this.regMemArray = data;
        console.log('Registered Members:', data);
      })
    }

    getregGuest(eventID: string) {
      this.regGuest$ = this.http.get<guestregForm[]>(`${this.apiUrl}api/myguestEventForm/${eventID}`);
      this.regGuest$.subscribe((data) => {
        this.regGuestArray = data;
        console.log('Registered Guest:', data);
      })
    }

    startIndex(): number {
      return (this.currentPage - 1) * this.itemsPerPage;
    }
  
    // Calculate the end index of the items to display on the current page
    endIndex(): number {
      return Math.min(this.startIndex() + this.itemsPerPage - 1, this.regMemArray.length - 1);
    }
  
    // Function to change the current page
    setPage(page: number) {
      this.currentPage = page;
    }
  
    search() {
      // If search query is empty, reset MemberArray to show all members
      if (!this.searchQuery.trim()) {
        this.getregMem(this._id);
        return;
      }
    
      // Convert searchQuery to lowercase for case-insensitive search
      const searchTerm = this.searchQuery.toLowerCase();
    
      // Filter MemberArray based on search query
      this.regMemArray = this.regMemArray.filter(regMem => {
        // Check if member and memName property exist
        if (regMem && regMem.memName) {
          // Perform case-insensitive search on memName
          return regMem.memName.toLowerCase().includes(searchTerm);
        }
        return false; // Exclude member if memName is not present
      });
    }

    startIndex1(): number {
      return (this.currentPage - 1) * this.itemsPerPage;
    }
  
    // Calculate the end index of the items to display on the current page
    endIndex1(): number {
      return Math.min(this.startIndex() + this.itemsPerPage - 1, this.regGuestArray.length - 1);
    }

    search1() {
      // If search query is empty, reset MemberArray to show all members
      if (!this.searchQuery.trim()) {
        this.getregGuest(this._id);
        return;
      }
    
      // Convert searchQuery to lowercase for case-insensitive search
      const searchTerm = this.searchQuery.toLowerCase();
    
      // Filter MemberArray based on search query
      this.regGuestArray = this.regGuestArray.filter(regGuest => {
        // Check if member and memName property exist
        if (regGuest && regGuest.guestName) {
          // Perform case-insensitive search on memName
          return regGuest.guestName.toLowerCase().includes(searchTerm);
        }
        return false; // Exclude member if memName is not present
      });
    }

    getTrustedUrl(videoUrl: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
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
