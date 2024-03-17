import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mem-eventregform',
  templateUrl: './mem-eventregform.component.html',
  styleUrls: ['./mem-eventregform.component.css']
})
export class MemEventregformComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  orgID!: string;
  eventID!: string;
  orgName!: string;
  memType: string = '';
  form!: FormGroup;
  submitted: boolean = false;
  membershipStatus: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventID = params['id'];
      this.orgName = params['orgName'];
      this.orgID = params['orgID'];
    });

    // Move the fetchMemberData call here
    this.fetchMemberData();

    this.form = this.formBuilder.group({
      memName: ['', Validators.required],
      memType: ['', Validators.required],
      proofofPayment: ['', Validators.required],
      emailAddress: ['', Validators.required],
      contactno: ['', Validators.required]
    });
  }

  fetchMemberData() {
    // Fetch the member details including the memID
    this.http.get<any>('http://localhost:5000/api/member', { withCredentials: true }).pipe(
      switchMap((memberRes: any) => {
        const memID = memberRes._id;
        console.log("Member ID:", memID);
        // Fetch the organization details using the memID from the myOrganizations endpoint
        return this.http.get<any>(`http://localhost:5000/api/thisevent/${this.eventID}`, { withCredentials: true }).pipe(
          map((orgRes: any) => ({ memID, orgID: orgRes.orgID }))
        );
      })
    ).subscribe(
      ({ memID, orgID }: { memID: string, orgID: string }) => {
        console.log("Organization ID:", orgID);
        this.http.get<any>(`http://localhost:5000/api/applicationStatus/${orgID}/${memID}`, { withCredentials: true }).subscribe(
          (statusRes: any[]) => {
            this.membershipStatus = statusRes;
            console.log("Membership:", this.membershipStatus);

            // Loop through each element in the array to check for chooseMem property
            this.membershipStatus.forEach((status: any) => {
              console.log("chooseMem:", status.chooseMem);
            });

            // Extract chooseMem property from each element in membershipStatus array
            const chooseMems = this.membershipStatus.map((status: any) => status.chooseMem);
            console.log("Choose Mems:", chooseMems);

            // If you want to set memType as the first element's chooseMem, you can do:
            this.memType = chooseMems.length > 0 ? chooseMems[0] : '';
            console.log("Membership Type:", this.memType);
            this.form.get('memType')?.setValue(this.memType);
          },
          (error) => {
            console.error('Error fetching memType:', error);
            // Handle error fetching memType
          }
        );
        // Once we have the orgID and memID, we can use them to fetch the memType
      },
      (error) => {
        console.error('Error fetching organization details:', error);
        // Handle error fetching organization details
      }
    );
  }




  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertfiletobase64(file, (base64String) => {
      this.form.get('proofofPayment')?.setValue(base64String);
    });
  }

  convertfiletobase64(file: File, callback: (base64string: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64string = reader.result as string;
      callback(base64string);
    };
    reader.readAsDataURL(file);
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const regForm = this.form.getRawValue();
    this.http.get(`http://localhost:5000/api/thisevent/${this.eventID}`, { withCredentials: true }).subscribe(
      (event: any) => {
        const updatedSeats = event.eventSeats - 1;
        event.eventSeats = updatedSeats;
        this.http.patch(`http://localhost:5000/api/event/${this.eventID}`, event, { withCredentials: true }).subscribe(
          () => {
            this.registerToEvent(regForm);
          },
          (updateError) => {
            console.error('Error updating event seats:', updateError);
          }
        );
      },
      (eventError) => {
        console.error('Error fetching event details:', eventError);
      }
    );
  }

  registerToEvent(regForm: any) {
    this.http.get('http://localhost:5000/api/member', { withCredentials: true }).subscribe(
      (memberRes: any) => {
        const orgID = memberRes.orgID;
        const eventID = memberRes.eventID;
        const memID = memberRes._id;
        const formData = {
          orgID: orgID,
          orgName: this.orgName,
          eventID: eventID,
          memID: memID,
          memName: regForm.memName,
          memType: regForm.memType,
          proofofPayment: regForm.proofofPayment,
          emailAddress: regForm.emailAddress,
          contactno: regForm.contactno
        };
        this.http.post('http://localhost:5000/api/createRegForm', formData, { withCredentials: true }).subscribe(
          () => {
            this.handleSuccess();
          },
          (err) => {
            console.error('Error registering to the event:', err);
          }
        );
      },
      (error) => {
        console.error('Error fetching member details:', error);
      }
    );
  }

  handleSuccess() {
    Swal.fire("Success", "You are registered to the event!");
    this.form.reset();
    this.router.navigate(['/member-event-details', this.orgName, this.eventID]);
  }
}
