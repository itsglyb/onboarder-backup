import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  admin!: string;

  constructor(private renderer: Renderer2, private el: ElementRef,  private http:HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeSidebar();

    this.http.get('http://localhost:5000/api/admin', {
      withCredentials: true
    }).subscribe(
      (res:any) => {
        this.admin = `${res.firstName}`;
    
      },
      (err) => {
        this.admin = "error"
       
    
      });


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
    this.http.post('http://localhost:5000/api/logout', null, { withCredentials: true }).subscribe(
      (response) => {
        // Handle the successful logout response here
        this.router.navigate(['/auth-login']);
      },
      (error) => {
        // Handle any errors that occur during the logout process
      }
    );
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
