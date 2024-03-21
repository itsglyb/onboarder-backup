import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-navbar',
  templateUrl: './org-navbar.component.html',
  styleUrls: ['./org-navbar.component.css']
})
export class OrgNavbarComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  organization!: string;
  logo!: string;
  orgCode!: string;
  orgID!: string;
  expirationDate!:string;

  constructor(private renderer: Renderer2, private el: ElementRef,  private http:HttpClient,
    private router: Router) { }

  redirecttoOrgEvent(orgID: string) {
    this.router.navigate(['/org-events', orgID]);
  }

  ngOnInit(): void {
    this.initializeSidebar();

    this.http.get(`${this.apiUrl}api/organization`, {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.organization = `${res.orgName}`;
        this.logo = `${res.logo}`;
        this.orgCode = `${res.orgCode}`;
        this.orgID = `${res._id}`;
        this.expirationDate = `${res.expirationDate}`;
        const expirationDate1 = new Date(this.expirationDate);
        const currentDate = new Date();
        if (expirationDate1 <= currentDate) {
          this.generateNewOrgCode();
        }
      },
      (err) => {
        this.organization = "error"
        this.logo = "error"
        this.orgCode = "error"
      }
    );

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/navbar.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading navbar.js', error);
    });
  }

  private initializeSidebar(): void {
    const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle"),
      modeSwitch = document.querySelector(".toggle-switch"),
      modeText = document.querySelector(".mode-text"),
      searchBtn = document.querySelector(".search-bar");

    if (modeSwitch) {
      modeSwitch.addEventListener("click", () => {
        if (body) {
          body.classList.toggle("dark");

          if (body.classList.contains("dark")) {
            if (modeText instanceof HTMLElement) {
              modeText.innerText = " Light Mode ";
            }
          } else {
            if (modeText instanceof HTMLElement) {
              modeText.innerText = " Dark Mode ";
            }
          }
        }
      });
    }

    if (toggle) {
      toggle.addEventListener("click", () => {
        if (sidebar) {
          sidebar.classList.toggle("close");
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        if (sidebar) {
          sidebar.classList.remove("close");
        }
      });
    }
  }

  logout() {
    this.http.post(`${this.apiUrl}api/logout`, null, { withCredentials: true }).subscribe(
      (response) => {
        this.router.navigate(['/auth-login']);
      },
      (error) => {
      }
    );
  }

  private loadScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.type = 'text/javascript';
      scriptElement.onload = () => resolve();
      scriptElement.onerror = (error) => reject(error);
      document.body.appendChild(scriptElement);
    });
  }

  generateNewOrgCode() {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    const lengthOfCode = 8;
    const newOrgCode = this.makeRandomCode(lengthOfCode, possible);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // expires in 30 days

    this.http.patch(`${this.apiUrl}api/organization/${this.orgID}`, {
      orgCode: newOrgCode,
      expirationDate: expirationDate.toISOString() // Convert to ISO string for backend compatibility
    }, {
      withCredentials: true
    }).subscribe(
      () => {
        console.log('New Org Code generated: ' + newOrgCode);
        this.orgCode = newOrgCode;
      },
      (err) => {
        console.error('Error updating org code:', err);
      }
    );
  }

  makeRandomCode(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
