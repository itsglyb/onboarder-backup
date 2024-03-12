import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  MemberArray: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  _id = "";
  firstName = "";
  lastName = "";
  email = "";
  dateCreated = "";
  Math: any = Math; 
  searchQuery: string = '';

  constructor(private http: HttpClient) {
    this.getAllMember();
  }

  getAllMember() {
    this.http.get("http://localhost:5000/api/viewmember")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.MemberArray = resultData;
      })
  }

  setUpdate(data: any) {
    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.dateCreated = data.dateCreated;
  }

  updateMember() {
    let memberData = {
      "_id": this._id,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "dateCreated": this.dateCreated
    };

    this.http.patch("http://localhost:5000/api/member" + "/" + this._id, memberData).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllMember();
    })
  }

  setDelete(data: any) {
    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.dateCreated = data.dateCreated;
  }

  deleteMember() {
    let memberData = {
      "_id": this._id,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "dateCreated": this.dateCreated
    };

    this.http.delete("http://localhost:5000/api/member" + "/" + this._id).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllMember();
    })
  }

  // Calculate the start index of the items to display on the current page
  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Calculate the end index of the items to display on the current page
  endIndex(): number {
    return Math.min(this.startIndex() + this.itemsPerPage - 1, this.MemberArray.length - 1);
  }

  // Function to change the current page
  setPage(page: number) {
    this.currentPage = page;
  }

  search() {
    // If search query is empty, reset MemberArray to show all members
    if (!this.searchQuery.trim()) {
      this.getAllMember();
      return;
    }
  
    // Convert searchQuery to lowercase for case-insensitive search
    const searchTerm = this.searchQuery.toLowerCase();
  
    // Filter MemberArray based on search query
    this.MemberArray = this.MemberArray.filter(member => {
      // Check if member and memName property exist
      if (member && member.firstName) {
        // Perform case-insensitive search on memName
        return member.firstName.toLowerCase().includes(searchTerm);
      }
      return false; // Exclude member if memName is not present
    });
  }

  ngOnInit(): void {
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/admin-user.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading admin-user.js', error);
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
