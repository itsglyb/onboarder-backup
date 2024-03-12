import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orgapproval',
  templateUrl: './admin-orgapproval.component.html',
  styleUrls: ['./admin-orgapproval.component.css']
})
export class AdminOrgapprovalComponent {
  ngOnInit(): void {
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/admin-org.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading admin-org.js', error);
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
