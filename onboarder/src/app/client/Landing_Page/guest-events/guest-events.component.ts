import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
declare var $: any;
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-guest-events',
  templateUrl: './guest-events.component.html',
  styleUrls: ['./guest-events.component.css']
})
export class GuestEventsComponent {

  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private renderer2: Renderer2, private el: ElementRef, private http: HttpClient) {
    this.getOrgs();
  }

  OrgArray: any[] = [];
  ngOnInit(): void {
    const n = "#nav";
    const no = ".nav-items";
    this.getOrgs();

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
  
  getOrgs(): void {
    this.http.get(`${this.apiUrl}api/vieworganization`)
    .subscribe((resData:any) => {
      console.log(resData);
      this.OrgArray = resData;
    })
  }
  // Fires on button click
  onBtnClick(orgName: string, orgID:string){
    // Navigate to /products page
    this.router.navigate(['/guestEventsListing', orgName, orgID]);
  }
  redirectToLogin() {
    this.router.navigate(['/auth-login']);
  }

}
