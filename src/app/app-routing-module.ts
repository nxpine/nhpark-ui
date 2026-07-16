import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomerComponent } from './customer/customer';
import { HomeComponent } from './home/home';
import { AddressComponent } from './address/address';
import { CustomerAddressComponent } from './customer-address/customer-address';
import { CustomerBookingComponent} from './customer-booking/customer-booking';
import { LocationComponent } from './location/location';
import { BookingComponent } from './booking/booking';
import { VehicleComponent } from './vehicle/vehicle';
import { LoginComponent } from './login/login';
import { CustomerDetailsComponent } from './customer-details/customer-details';
import { CustomerAddressCreateComponent } from './customer-address-create/customer-address-create';
import { CustomerBookingCreateComponent } from './customer-booking-create/customer-booking-create';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'address', component: AddressComponent },
  { path: 'customer-address/:id', component: CustomerAddressComponent },
  { path: 'create-address/:id', component: CustomerAddressCreateComponent },
  { path: 'customer-booking/:id', component: CustomerBookingComponent },
  { path: 'location', component: LocationComponent },
  { path: 'booking', component: BookingComponent},
  { path: 'vehicle', component: VehicleComponent },
  { path: 'customer-details/:id', component: CustomerDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer-address-create/:id', component: CustomerAddressCreateComponent },
  { path: 'customer-booking-create/:id', component: CustomerBookingCreateComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
