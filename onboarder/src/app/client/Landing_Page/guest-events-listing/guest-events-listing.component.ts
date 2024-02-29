import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-guest-events-listing',
  templateUrl: './guest-events-listing.component.html',
  styleUrls: ['./guest-events-listing.component.css']
})
export class GuestEventsListingComponent implements OnInit {

  constructor(private router: Router, private renderer2: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    const n = "#nav";
    const no = ".nav-items";

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
