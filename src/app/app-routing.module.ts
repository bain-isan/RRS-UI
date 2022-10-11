import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainComponent } from './add-train/add-train.component';
import { RoleGuard } from './Auth/role.guard';
import { RouteGuardGuard } from './Auth/route-guard.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {LoginComponent} from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchTrainComponent } from './search-train/search-train.component';
import { TicketComponent } from './ticket/ticket.component';
import { TrainListComponent } from './train-list/train-list.component';
import { UpdateTrainComponent } from './update-train/update-train.component';
//import { TrainListComponent } from './train-list/train-list.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

const routes: Routes = [
  {path:"",component:SearchTrainComponent},
  {path:"Train/Search",component:SearchTrainComponent},
  {path:"Train/Available",component:SearchResultComponent},
  {path:"Login", component: LoginComponent},
  {path:"Register", component: RegisterComponent},
  {path:"Reservation/:TrainId", component:ReservationComponent, canActivate:[RouteGuardGuard, RoleGuard], data:{role:["User"]}},
  {path:"Payment", component:PaymentComponent, canActivate:[RouteGuardGuard, RoleGuard], data:{role:["User"]}},
  {path:"Ticket/Search", component:TicketComponent, canActivate:[RouteGuardGuard, RoleGuard], data:{role:["User","Admin"]}},
  {path:"Ticket/View/:pnr", component:ViewTicketComponent, canActivate:[RouteGuardGuard, RoleGuard], data:{role:["User","Admin"]}},
  {path:"Train/Add", component:AddTrainComponent, canActivate:[RouteGuardGuard, RoleGuard], data:{role:["Admin"]}},
  {path:"Train/Update/:TrainId", component:UpdateTrainComponent, canActivate:[RouteGuardGuard, RoleGuard], data:{role:["Admin"]}},
  {path:"Train/View", component:TrainListComponent, canActivate:[RouteGuardGuard, RoleGuard] , data:{role:["Admin"]}},
  {path:"Forbidden", component:ForbiddenComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
