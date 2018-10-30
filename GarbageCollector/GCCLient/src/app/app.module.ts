import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import {  } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterGarbageComponent } from './register-garbage/register-garbage.component';
import { MapComponent } from './map/map.component';
import { TransferServiceService } from './services/transfer-service.service';
import { RestService } from './services/rest.service';
import { HttpModule } from '@angular/http';
import { TruckComponent } from './truck/truck.component';
import { RouteComponent } from './truck/route/route.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegistrationComponent},
  { path: 'garbage', component: RegisterGarbageComponent},
  { path: 'map', component: MapComponent},
  { path: 'truck', component: TruckComponent},
  { path: 'truck/route', component: RouteComponent},
  { path: '**', redirectTo: '' }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    RegisterGarbageComponent,
    MapComponent,
    TruckComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ), HttpModule
  ],
  providers: [ AuthGuard, TransferServiceService, RestService],
  bootstrap: [AppComponent],

})
export class AppModule { }
