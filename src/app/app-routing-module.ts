import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth-guard';

import { CustomerComponent } from './customer/customer';
import { HomeComponent } from './home/home';
import { AddressComponent } from './address/address';
import { CustomerAddressComponent } from './customer-address/customer-address';
import { CustomerBookingComponent} from './customer-booking/customer-booking';
import { CustomerVehicleComponent } from './customer-vehicle/customer-vehicle';
import { LocationComponent } from './location/location';
import { BookingComponent } from './booking/booking';
import { VehicleComponent } from './vehicle/vehicle';
import { LoginComponent } from './login/login';
import { CustomerDetailsComponent } from './customer-details/customer-details';
import { CustomerAddressCreateComponent } from './customer-address-create/customer-address-create';
import { CustomerBookingCreateComponent } from './customer-booking-create/customer-booking-create';
import { CustomerVehicleCreateComponent } from './customer-vehicle-create/customer-vehicle-create';
import { AboutComponent } from './about/about';
import { FeaturesComponent } from './features/features';
import { ParksComponent } from './parks/parks';
import { CreateAccountComponent } from './create-account/create-account';
import { AccountSettingsComponent } from './account-settings/account-settings';
import { MyProfileComponent } from './my-profile/my-profile';

const routes: Routes = [

  // =========================
  // PUBLIC
  // =========================

  { path: 'login', component: LoginComponent },

  { path: 'create-account', component: CreateAccountComponent },


  // =========================
  // PROTECTED
  // =========================

  { path: '', component: HomeComponent, canActivate: [authGuard] },

  { path: 'customer', component: CustomerComponent, canActivate: [authGuard] },

  { path: 'address', component: AddressComponent, canActivate: [authGuard] },

  { path: 'customer-address/:id', component: CustomerAddressComponent, canActivate: [authGuard] },

  { path: 'create-address/:id', component: CustomerAddressCreateComponent, canActivate: [authGuard] },

  { path: 'customer-booking/:id', component: CustomerBookingComponent, canActivate: [authGuard] },

  { path: 'customer-vehicle/:id', component: CustomerVehicleComponent, canActivate: [authGuard] },

  { path: 'location', component: LocationComponent, canActivate: [authGuard] },

  { path: 'booking', component: BookingComponent, canActivate: [authGuard] },

  { path: 'vehicle', component: VehicleComponent, canActivate: [authGuard] },

  { path: 'customer-details/:id', component: CustomerDetailsComponent, canActivate: [authGuard] },

  { path: 'customer-address-create/:id', component: CustomerAddressCreateComponent, canActivate: [authGuard] },

  { path: 'customer-booking-create/:id', component: CustomerBookingCreateComponent, canActivate: [authGuard] },

  { path: 'customer-vehicle-create/:id', component: CustomerVehicleCreateComponent, canActivate: [authGuard] },

  { path: 'about', component: AboutComponent, canActivate: [authGuard] },

  { path: 'features', component: FeaturesComponent, canActivate: [authGuard] },

  { path: 'parks', component: ParksComponent, canActivate: [authGuard] },

  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [authGuard] },

  { path: 'my-profile', component: MyProfileComponent, canActivate: [authGuard] },
  

  // =========================
  // UNKNOWN ROUTE
  // =========================

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
