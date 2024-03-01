import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private router: Router, private renderer2: Renderer2, private el: ElementRef, private route: ActivatedRoute, private http: HttpClient) {
  }
  
  orgEventArray: OrgEvent[] = [];
  orgEvent$: Observable<OrgEvent[]> | undefined;
  ngOnInit(): void {
    const n = "#nav";
    const no = ".nav-items";
    this.route.params.subscribe(params => {
      const orgID = params['orgID'];
      this.getOrgEvent(orgID);
    })

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

  showModalAfterDelay() {
    this.showSusbcFormModal(); // Show the modal immediately without delay
  }

  showSusbcFormModal() {
    const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
    $(susbcFormModal).modal('show');
  }

  onSubmitForm(e: Event) {
    e.preventDefault();
  
    const subsForm = this.el.nativeElement.querySelector('#subs-form');
    const susbcFormModal = this.el.nativeElement.querySelector('#susbc-form');
    const susbcFormThankModal = this.el.nativeElement.querySelector('#susbc-form-thank');
  
    // Reset form
    $(subsForm).trigger('reset');
  
    // Hide form modal and show thank you modal
    $(susbcFormModal).modal('hide');
    $(susbcFormThankModal).modal('show');
  }

  closeModal() {
    $('#susbc-form').modal('hide');
    $('#susbc-form-thank').modal('hide');
  }

  redirectToLogin() {
    this.router.navigate(['/auth-login']);
  }
  // constructor(private el: ElementRef) {}

  // ngOnInit() {
  //   $(document).ready(() => {
  //     $('#openBtn').click((event: Event) => {
  //       event.preventDefault();
  //       $('#myModal').modal('show');
  //     });
  //   });
  // }

  // closeModal() {
  //   $('#myModal').modal('hide');
  // }
}
