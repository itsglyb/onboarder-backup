import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-events',
  templateUrl: './guest-events.component.html',
  styleUrls: ['./guest-events.component.css']
})
export class GuestEventsComponent {

  constructor(private router: Router) { }
  ngOnInit(): void { }
  
  // Fires on button click
  onBtnClick(){
    // Navigate to /products page
    this.router.navigate(['/guestEventsListing']);
  }

}
