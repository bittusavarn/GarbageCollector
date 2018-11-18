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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptorService } from './auth/basic-auth-interceptor.service';
import { ErrorAuthInterceptorService } from './auth/error-auth-interceptor.service';
import { TopnavComponent } from './home/topnav/topnav.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { SidebarDirective } from './directives/sidebar.directive';
import { MyTruckComponent } from './truck/my-truck/my-truck.component';
import { MyGarbageComponent } from './garbage/my-garbage/my-garbage.component';
import { PickComponent } from './garbage/pick/pick.component';

const authorizedRoutes = [
{ path: 'truck', component: TruckComponent},
{ path: 'garbage', component: RegisterGarbageComponent},
{ path: 'map', component: MapComponent},
{ path: 'myTrucks', component: MyTruckComponent},
{ path: 'myGarbages', component: MyGarbageComponent},
{ path: 'truck/route', component: RouteComponent},
{ path: 'garbage/pick', component: PickComponent}
];

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: authorizedRoutes},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: authorizedRoutes},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
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
    RouteComponent,
    TopnavComponent,
    SidenavComponent,
    SidebarDirective,
    MyTruckComponent,
    MyGarbageComponent,
    PickComponent,
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
