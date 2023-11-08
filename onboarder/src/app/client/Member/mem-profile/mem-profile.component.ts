import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mem-profile',
  templateUrl: './mem-profile.component.html',
  styleUrls: ['./mem-profile.component.css']
})
export class MemProfileComponent implements OnInit {
  memberfirstName!: string;
  memberlastName!: string;
  memberemail!: string;
  member_id!: string;
  MemberArray: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMemberInfo();
  }

  private fetchMemberInfo(): void {
    this.http.get('http://localhost:5000/api/member', {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.member_id = `${res._id}`;
        this.memberfirstName = `${res.firstName}`;
        this.memberlastName = `${res.lastName}`;
        this.memberemail = `${res.email}`;
      },
      (err) => {
        this.member_id = "error";
        this.memberfirstName = "error";
        this.memberlastName = "error";
        this.memberemail = "error";
      }
    );
  }
  setUpdate(res:any) 
  {
    this.member_id = `${res._id}`;
    this.memberfirstName= `${res.firstName}`;
    this.memberlastName = `${res.lastName}`;
    this.memberemail = `${res._id}`;
  }

  updateMemberInfo(): void {
    let memberData = {
      "_id": this.member_id,
      "firstName": this.memberfirstName,
      "lastName": this.memberlastName,
      "email": this.memberemail
    };
  
    this.http.patch('http://localhost:5000/api/member' + '/' + this.member_id, memberData, {
      withCredentials: true
    }).subscribe(
      (updatedData: any) => {
        // Update the UI directly with the new data
        this.member_id = updatedData._id;
        this.memberfirstName = updatedData.firstName;
        this.memberlastName = updatedData.lastName;
        this.memberemail = updatedData.email;
  
        console.log(updatedData);
        this.fetchMemberInfo();
      },
      (error) => {
        console.error('Error updating member:', error);
        // Handle errors, e.g., show an error message to the user
      }
    );
  }
}
