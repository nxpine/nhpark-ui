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
import { CustomerAddress } from './customer-address/customer-address';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    HomeComponent,
    AddressComponent,
    LocationComponent,
    BookingComponent,
    VehicleComponent,
    CustomerAddress,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CustomerComponent,
    CustomerDetailsComponent,
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
