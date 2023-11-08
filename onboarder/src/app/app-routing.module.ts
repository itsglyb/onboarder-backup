import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './client/Landing_Page/home/home.component';
import { AboutComponent } from './client/Landing_Page/about/about.component';
import { ServicesComponent } from './client/Landing_Page/services/services.component';
import { DevelopersComponent } from './client/Landing_Page/developers/developers.component';

import { OrgLandingComponent } from './client/Org/org-landing/org-landing.component';
import { OrgRegistrationComponent } from './client/Org/org-registration/org-registration.component';
import { OrgEventsComponent } from './client/Org/org-events/org-events.component';
import { OrgMemformsComponent } from './client/Org/org-memforms/org-memforms.component';
import { OrgMemverificationComponent } from './client/Org/org-memverification/org-memverification.component';
import { OrgMembersComponent } from './client/Org/org-members/org-members.component';
import { OrgProfileComponent } from './client/Org/org-profile/org-profile.component';

import { MemberSignupComponent } from './client/Member/mem-signup/mem-signup.component';
import { MemLoginComponent } from './client/Member/mem-login/mem-login.component';
import { MemLandingComponent } from './client/Member/mem-landing/mem-landing.component';
import { MemEventsComponent } from './client/Member/mem-events/mem-events.component';
import { MemOrganizationComponent } from './client/Member/mem-organization/mem-organization.component';
import { MemProfileComponent } from './client/Member/mem-profile/mem-profile.component';

import { GeneralLoginComponent } from './client/Login/general-login/general-login.component';

import { AdminOrgsComponent } from './client/Admin/admin-orgs/admin-orgs.component';
import { AdminUsersComponent } from './client/Admin/admin-users/admin-users.component';
import { AdminEventsComponent } from './client/Admin/admin-events/admin-events.component';
import { OrgCreateEventComponent } from './client/Org/org-create-event/org-create-event.component';
import { MemRegistrationComponent } from './client/Member/mem-registration/mem-registration.component';
import { MemEventregformComponent } from './client/Member/mem-eventregform/mem-eventregform.component';
import { MemOrgprofileComponent } from './client/Member/mem-orgprofile/mem-orgprofile.component';
import { MemOrgmemformComponent } from './client/Member/mem-orgmemform/mem-orgmemform.component';
import { OrgEventDetailsComponent } from './client/Org/org-event-details/org-event-details.component';
import { MemRejectComponent } from './client/Org/mem-reject/mem-reject.component';
import { NotfoundpageComponent } from './client/extrapages/notfoundpage/notfoundpage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'general-login', component: GeneralLoginComponent },

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'developers', component: DevelopersComponent },

  { path: 'org-landing', component: OrgLandingComponent },
  { path: 'org-registration', component: OrgRegistrationComponent },
  { path: 'org-memforms', component: OrgMemformsComponent },
  { path: 'org-memverification', component: OrgMemverificationComponent },
  { path: 'org-memreject', component: MemRejectComponent },
  { path: 'org-members', component: OrgMembersComponent },
  { path: 'org-events/:orgID', component: OrgEventsComponent},
  { path: 'org-profile', component: OrgProfileComponent },
  { path: 'org-create-event', component: OrgCreateEventComponent },
  { path: 'org-event-details/:orgID/:id', component: OrgEventDetailsComponent },

  { path: 'member-landing', component: MemLandingComponent },
  { path: 'member-signup', component: MemberSignupComponent },
  { path: 'auth-login', component: MemLoginComponent },
  { path: 'member-events', component: MemEventsComponent},
  { path: 'member-organization', component: MemOrganizationComponent},
  { path: 'member-profile', component: MemProfileComponent},
  { path: 'member-event-details/:orgID/:id', component: MemRegistrationComponent},
  { path: 'member-event-regform/:orgName/:id', component: MemEventregformComponent},
  { path: 'member-orgprofile/:id', component: MemOrgprofileComponent},
  { path: 'member-orgprofile1/:orgCode', component: MemOrgprofileComponent},
  { path: 'member-orgmemform/:id', component: MemOrgmemformComponent},


  { path: 'admin-orgs', component: AdminOrgsComponent},
  { path: 'admin-users', component: AdminUsersComponent},
  { path: 'admin-events', component: AdminEventsComponent},

  //Wild Card Route for 404 request 
  { path: '**', pathMatch: 'full', component: NotfoundpageComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
