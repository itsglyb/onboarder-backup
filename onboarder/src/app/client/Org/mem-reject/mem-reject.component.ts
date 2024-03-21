import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


interface MemForm {

  personalInfo: boolean,
  fullName: boolean,
  photo: boolean,
  sex: boolean,
  birthDate: boolean,
  placeOfBirth : boolean,
  civilStatus: boolean,
  religion: boolean,
  address: boolean,
  zip: boolean,
  email: boolean,
  contactNum: boolean,
  facebook: boolean,
    linkedIn: boolean,
    skype: boolean,
    zoom: boolean,
    idLicense: boolean,
    prcNo : boolean,
    prcDate: boolean,
    prcExpiration: boolean,
    studentID: boolean,
    aviation: boolean,
    caap: boolean,
    taxID: boolean,
    EducAttainment: boolean,
    tertiary: boolean,
    tertiaryDegree: boolean,
    tertiaryYear: boolean,
    tertiaryDiploma : boolean,
    masteral: boolean,
    masteralDegree: boolean,
    masteralYear: boolean,
    masteralDiploma: boolean,
    doctoral: boolean,
    doctoralDegree: boolean,
    doctoralYear: boolean,
    doctoralDiploma: boolean,
    employmentDetails: boolean,
    employer: boolean,
    jobTitle: boolean,
    employerAdd: boolean,
    membership: boolean,
    payment: boolean,
    memType1: boolean,
}


@Component({
  selector: 'app-mem-reject',
  templateUrl: './mem-reject.component.html',
  styleUrls: ['./mem-reject.component.css']
})


export class MemRejectComponent {
  private apiUrl = environment.apiUrl;

  memForm$: Observable<MemForm> | undefined;
  form!:FormGroup

  rejectedApplicationDetails: any[] = [];
  Math: any = Math;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  _id="";
  isVerified = "";
  isRejected = "";
  remarks="";
  chooseMem: any;
  payment: any;
  membership: any;
  employerAdd: any;
  jobTitle: any;
  employer: any;
  doctoralDiploma: any;
  doctoralYear: any;
  doctoralDegree: any;
  doctoral: any;
  masteralDiploma: any;
  masteralYear: any;
  masteralDegree: any;
  masteral: any;
  tertiaryDiploma: any;
  tertiaryYear: any;
  tertiaryDegree: any;
  tertiary: any;
  taxID: any;
  caap: any;
  aviation: any;
  studentID: any;
  prcExpiration: any;
  prcDate: any;
  prcNo: any;
  idLicense: any;
  zoom: any;
  skype: any;
  linkedIn: any;
  facebook: any;
  contactNum: any;
  email: any;
  zip: any;
  address: any;
  religion: any;
  civilStatus: any;
  placeOfBirth: any;
  birthDate: any;
  sex: any;
  photo: any;
  fullName: any;
  

constructor(
  private http: HttpClient, 
  private route: ActivatedRoute,
  private router: Router,
  ) {
    this.getAllApplication();
  }

  ngOnInit():void{
    this.http.get(`${this.apiUrl}api/organization`, {
      withCredentials: true
    }).subscribe(
      (memResponse: any) => {
        const _id = memResponse._id;
      this.getMemFormat(_id);
      })
  }

  getAllApplication(): void {
    this.http.get(`${this.apiUrl}api/rejected`, {withCredentials: true})
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.rejectedApplicationDetails = resultData;
      });


  }

  setView(data: any){
    this._id = data._id;
    this.fullName = data.fullName;
    this.photo = data.photo;
    this.sex = data.sex;
    this.birthDate = data.birthDate;
    this.placeOfBirth = data.placeOfBirth;
    this.civilStatus = data.civilStatus;
    this.religion = data.religion;
    this.address = data.address;
    this.zip = data.zip;
    this.email = data.email;
    this.contactNum = data.contactNum;
    this.facebook = data.facebook;
    this.linkedIn = data.linkedIn;
    this.skype = data.skype;
    this.zoom = data.zoom;
    this.idLicense = data.idLicense;
    this.prcNo = data.prcNo;
    this.prcDate = data.prcDate;
    this.prcExpiration = data.prcExpiration;
    this.studentID = data.studentID;
    this.aviation = data.aviation;
    this.caap = data.caap;
    this.taxID = data.taxID;
    this.tertiary = data.tertiary;
    this.tertiaryDegree = data.tertiaryDegree;
    this.tertiaryYear = data.tertiaryYear;
    this.tertiaryDiploma = data.tertiaryDiploma;
    this.masteral = data.masteral;
    this.masteralDegree = data.masteralDegree;
    this.masteralYear = data.masteralYear;
    this.masteralDiploma = data.masteralDiploma;
    this.doctoral = data.doctoral;
    this.doctoralDegree = data.doctoralDegree;
    this.doctoralYear = data.doctoralYear;
    this.doctoralDiploma = data.doctoralDiploma;
    this.employer = data.employer;
    this.jobTitle = data.jobTitle;
    this.employerAdd = data.employerAdd;
    this.membership = data.membership;
    this.payment = data.payment;
    this.chooseMem = data.chooseMem;
  }

  getMemFormat(_id: string) {

    this.memForm$ = this.http.get<MemForm>(`${this.apiUrl}api/myMemForm/${_id}`);
    this.memForm$.subscribe(data => {
      console.log('API Response:', data);
    });
  }

  getMemForm(_id: string): void {
    this.http.get(`${this.apiUrl}api/membershipApplication/${_id}`, { withCredentials: true })
      .subscribe((resultData) => {
        console.log(resultData);
        

        // Populate the form controls with the received data
        this.form.patchValue(resultData);
      });
  }

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Calculate the end index of the items to display on the current page
  endIndex(): number {
    return Math.min(this.startIndex() + this.itemsPerPage - 1, this.rejectedApplicationDetails.length - 1);
  }

  // Function to change the current page
  setPage(page: number) {
    this.currentPage = page;
  }

  search() {
    // If search query is empty, reset OrganizationArray to show all organizations
    if (!this.searchQuery.trim()) {
      this.getAllApplication();
      return;
    }

    // Convert searchQuery to lowercase for case-insensitive search
    const searchTerm = this.searchQuery.toLowerCase();

    // Filter OrganizationArray based on search query
    this.rejectedApplicationDetails = this.rejectedApplicationDetails.filter(rej => {
      // Check if organization and orgName property exist
      if (rej && rej.fullName) {
        // Perform case-insensitive search on orgName
        return rej.fullName.toLowerCase().includes(searchTerm);
      }
      return false; // Exclude organization if orgName is not present
    });
  }
}

