import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchTrainComponent } from './search-train/search-train.component';

const routes: Routes = [
  {path:"",component:SearchTrainComponent},
  {path:"Train/Search",component:SearchTrainComponent},
  {path:"Train/Available",component:SearchResultComponent},
  {path:"Login", component: LoginComponent},
  {path:"Register", component: RegisterComponent},
  {path:"Reservation", component:ReservationComponent},
  {path:"Payment", component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
