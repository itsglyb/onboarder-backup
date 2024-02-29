import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  
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

  redirectToLogin() {
    this.router.navigate(['/auth-login']);
  }

}
