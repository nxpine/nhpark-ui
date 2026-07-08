import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { CustomerComponent } from './customer/customer';
import { HomeComponent } from './home/home';
import { AddressComponent } from './address/address';
import { LocationComponent } from './location/location';
import { BookingComponent } from './booking/booking';
import { VehicleComponent } from './vehicle/vehicle';
import { LoginComponent } from './login/login';
import { CustomerDetailsComponent } from './customer-details/customer-details';

@NgModule({
  declarations: [App, CustomerDetailsComponent, LoginComponent, HomeComponent, AddressComponent, LocationComponent, BookingComponent, VehicleComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    CustomerComponent,
    
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
