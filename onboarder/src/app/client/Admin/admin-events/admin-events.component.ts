import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  providers: [DatePipe],
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit{
  EventArray: any[] = [];
  _id = "";
  eventTitle = "";
  eventDesc = "";
  eventDate: string | null = "";
  eventTime = "";
  location = "";
  meetingURL = "";
  poster = "";
  programme = "";
  video = "";
  eventSeats = "";
  eventPrice = "";
  eventPaymentDetails = "";

  constructor(private http: HttpClient, private datePipe: DatePipe){
    this.getAllEvents();
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertfiletobase64(file, (base64String) => {
      // Set the base64 string to the logo form control
      this.poster = base64String;
      this.programme = base64String;
    });
  }
  
  // Your convertfiletobase64 function
  convertfiletobase64(file: File, callback: (base64string: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64string = reader.result as string;
  
  
      callback(base64string);
    };
    reader.readAsDataURL(file);
  }

  getAllEvents(){
    this.http.get("http://localhost:5000/api/viewevent")
    .subscribe((resultData:any) => {
      console.log(resultData);
      this.EventArray = resultData;
    })
  }

  setUpdate(data:any) {
    this._id = data._id;
    this.eventTitle = data.eventTitle;
    this.eventDesc = data.eventDesc;
    this.eventDate = this.datePipe.transform(new Date(data.eventDate), 'medium');
    this.eventTime = data.eventTime;
    this.location = data.location;
    this.meetingURL = data.meetingURL;
    this.poster = data.poster;
    this.programme = data.programme;
    this.video = data.video;
    this.eventSeats = data.eventSeats;
    this.eventPrice = data.eventPrice;
    this.eventPaymentDetails = data.eventPaymentDetails;
  }

  updateEvent(){
    let eventData = {
      "_id" : this._id,
      "eventTitle" : this.eventTitle,
      "eventDesc" : this.eventDesc,
      "eventDate" : this.eventDate,
      "eventTime" : this.eventTime,
      "location" : this.location,
      "meetingURL" : this.meetingURL,
      "poster" : this.poster,
      "video" : this.video,
      "eventSeats" : this.eventSeats,
      "eventPrice" : this.eventPrice,
      "eventPaymentDetails" : this.eventPaymentDetails
    }

    this.http.patch("http://localhost:5000/api/event" + "/" + this._id, eventData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.getAllEvents();
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    )
  }

  setDelete(data:any) {
    this._id = data._id;
    this.eventTitle = data.eventTitle;
    this.eventDesc = data.eventDesc;
    this.eventDate = data.eventDate;
    this.eventTime = data.eventTime;
    this.location = data.location;
    this.meetingURL = data.meetingURL;
    this.poster = data.poster;
    this.programme = data.programme;
    this.video = data.video;
    this.eventSeats = data.eventSeats;
    this.eventPrice = data.eventPrice;
    this.eventPaymentDetails = data.eventPaymentDetails;
  }

  deleteEvent(){
    let eventData = {
      "_id" : this._id,
      "eventTitle" : this.eventTitle,
      "eventDesc" : this.eventDesc,
      "eventDate" : this.eventDate,
      "eventTime" : this.eventTime,
      "location" : this.location,
      "meetingURL" : this.meetingURL,
      "poster" : this.poster,
      "video" : this.video,
      "eventSeats" : this.eventSeats,
      "eventPrice" : this.eventPrice,
      "eventPaymentDetails" : this.eventPaymentDetails
    }

    this.http.delete("http://localhost:5000/api/event" + "/" + this._id).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.getAllEvents();
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    )
  }

  
  ngOnInit(): void {
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/triggermodal.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading triggermodal.js', error);
    });    
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
  