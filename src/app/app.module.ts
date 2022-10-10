import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchTrainComponent } from './search-train/search-train.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TicketComponent } from './ticket/ticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AddTrainComponent } from './add-train/add-train.component';
import { UpdateTrainComponent } from './update-train/update-train.component';
import { TrainListComponent } from './train-list/train-list.component';
import { InterceptInterceptor } from './Auth/intercept.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReservationComponent,
    PaymentComponent,
    SearchTrainComponent,
    RegisterComponent,
    SearchResultComponent,
    TicketComponent,
    ViewTicketComponent,
    AddTrainComponent,
    UpdateTrainComponent,
    TrainListComponent,
    NotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
