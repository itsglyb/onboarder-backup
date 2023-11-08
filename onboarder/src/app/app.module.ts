import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './client/Landing_Page/home/home.component';
import { AboutComponent } from './client/Landing_Page/about/about.component';
import { ServicesComponent } from './client/Landing_Page/services/services.component';
import { DevelopersComponent } from './client/Landing_Page/developers/developers.component';

import { OrgRegistrationComponent } from './client/Org/org-registration/org-registration.component';
import { OrgLandingComponent } from './client/Org/org-landing/org-landing.component';
import { OrgNavbarComponent } from './client/Org/org-navbar/org-navbar.component';
import { OrgEventsComponent } from './client/Org/org-events/org-events.component';
import { OrgProfileComponent } from './client/Org/org-profile/org-profile.component';
import { OrgMemformsComponent } from './client/Org/org-memforms/org-memforms.component';
import { OrgMemverificationComponent } from './client/Org/org-memverification/org-memverification.component';
import { OrgMembersComponent } from './client/Org/org-members/org-members.component';


import { MemProfileComponent } from './client/Member/mem-profile/mem-profile.component';
import { MemNavbarComponent } from './client/Member/mem-navbar/mem-navbar.component';
import { MemOrganizationComponent } from './client/Member/mem-organization/mem-organization.component';
import { MemRegistrationComponent } from './client/Member/mem-registration/mem-registration.component';
import { MemLandingComponent } from './client/Member/mem-landing/mem-landing.component';
import { MemberSignupComponent } from './client/Member/mem-signup/mem-signup.component';
import { MemLoginComponent } from './client/Member/mem-login/mem-login.component';
import { MemEventsComponent } from './client/Member/mem-events/mem-events.component';

import { AdminNavbarComponent } from './client/Admin/admin-navbar/admin-navbar.component';

import { GeneralLoginComponent } from './client/Login/general-login/general-login.component';
import { AdminOrgsComponent } from './client/Admin/admin-orgs/admin-orgs.component';
import { AdminUsersComponent } from './client/Admin/admin-users/admin-users.component';
import { AdminEventsComponent } from './client/Admin/admin-events/admin-events.component';
import { OrgCreateEventComponent } from './client/Org/org-create-event/org-create-event.component';
import { MemEventregformComponent } from './client/Member/mem-eventregform/mem-eventregform.component';
import { MemOrgprofileComponent } from './client/Member/mem-orgprofile/mem-orgprofile.component';
import { MemOrgmemformComponent } from './client/Member/mem-orgmemform/mem-orgmemform.component';
import { OrgEventDetailsComponent } from './client/Org/org-event-details/org-event-details.component';
import { MemRejectComponent } from './client/Org/mem-reject/mem-reject.component';
import { NotfoundpageComponent } from './client/extrapages/notfoundpage/notfoundpage.component';


export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    DevelopersComponent,
    OrgRegistrationComponent,
    OrgLandingComponent,
    OrgNavbarComponent,
    OrgEventsComponent,
    OrgProfileComponent,
    OrgMemformsComponent,
    OrgMemverificationComponent,
    OrgMembersComponent,    
    MemRegistrationComponent,
    MemLandingComponent,
    MemberSignupComponent,
    MemLoginComponent,
    MemProfileComponent,
    MemNavbarComponent,
    MemOrganizationComponent,
    MemEventsComponent,
    MemProfileComponent,
    AdminNavbarComponent,
    GeneralLoginComponent,
    AdminOrgsComponent,
    AdminUsersComponent,
    AdminEventsComponent,
    OrgCreateEventComponent,
    MemEventregformComponent,
    MemOrgprofileComponent,
    MemOrgmemformComponent,
    OrgEventDetailsComponent,
    MemRejectComponent,
    NotfoundpageComponent
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
