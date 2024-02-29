import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-guest-events',
  templateUrl: './guest-events.component.html',
  styleUrls: ['./guest-events.component.css']
})
export class GuestEventsComponent {

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
  
  // Fires on button click
  onBtnClick(){
    // Navigate to /products page
    this.router.navigate(['/guestEventsListing']);
  }
  redirectToLogin() {
    this.router.navigate(['/auth-login']);
  }

}
