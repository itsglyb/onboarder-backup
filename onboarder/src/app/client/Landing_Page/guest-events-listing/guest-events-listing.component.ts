import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-guest-events-listing',
  templateUrl: './guest-events-listing.component.html',
  styleUrls: ['./guest-events-listing.component.css']
})
export class GuestEventsListingComponent implements OnInit {

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  ngOnInit() {
    // No need to call showModalAfterDelay here if you want to trigger it after some event.
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
