import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainComponent } from './add-train/add-train.component';
import {LoginComponent} from './login/login.component';
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
  {path:"Reservation", component:ReservationComponent},
  {path:"Payment", component:PaymentComponent},
  {path:"Ticket/Search", component:TicketComponent},
  {path:"Ticket/Views", component:ViewTicketComponent},
  {path:"Train/Add", component:AddTrainComponent},
  {path:"Train/View", component:TrainListComponent},
  {path:"Train/Update", component:UpdateTrainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
