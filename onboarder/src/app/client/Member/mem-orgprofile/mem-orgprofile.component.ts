import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mem-orgprofile',
  templateUrl: './mem-orgprofile.component.html',
  styleUrls: ['./mem-orgprofile.component.css']
})
export class MemOrgprofileComponent implements OnInit {
  orgInfo: any[] = [];
  membershipStatus: any[] = [];


  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router,
    ) {
      
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orgId = params['id'];
      this.getAllOrganization(orgId);
      const orgCode = params['orgCode'];
    this.getOrganization(orgCode)
    });

  }


  getAllOrganization(orgId: string) {
    this.http.get(`http://localhost:5000/api/thisOrg/${orgId}`)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.orgInfo = [resultData];
          const id = resultData._id;
  
          this.http.get('http://localhost:5000/api/member', {
            withCredentials: true
          })
          .subscribe(
            (memResponse: any) => {
              const memID = memResponse._id;
  
              this.http.get(`http://localhost:5000/api/applicationStatus/${id}/${memID}`, {
                withCredentials: true
              })
              .subscribe(
                (membershipStatus: any) => {
                  console.log(membershipStatus);
                  this.membershipStatus = [membershipStatus];
                },
                error => {
                  console.error('Error fetching membership status:', error);
                }
              );
            },
            error => {
              console.error('Error fetching member data:', error);
            }
          );
        },
        error => {
          console.error('Error fetching organization data:', error);
        }
      );
  }

  getOrganization(orgCode: string) {
    this.http.get(`http://localhost:5000/api/thisOrg1/${orgCode}`)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.orgInfo = [resultData];
          const id = resultData._id;
  
          this.http.get('http://localhost:5000/api/member', {
            withCredentials: true
          })
          .subscribe(
            (memResponse: any) => {
              const memID = memResponse._id;
  
              this.http.get(`http://localhost:5000/api/applicationStatus/${id}/${memID}`, {
                withCredentials: true
              })
              .subscribe(
                (membershipStatus: any) => {
                  console.log(membershipStatus);
                  this.membershipStatus = [membershipStatus];
                },
                error => {
                  console.error('Error fetching membership status:', error);
                }
              );
            },
            error => {
              console.error('Error fetching member data:', error);
            }
          );
        },
        error => {
          console.error('Error fetching organization data:', error);
        }
      );
  }
  redirectToMemOrMemForm(_id: string) {
    this.router.navigate(['/member-orgmemform', _id]);
  }
}
