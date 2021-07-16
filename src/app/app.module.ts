import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './landings/auth/login/login.component';
import { CallbackComponent } from './landings/auth/callback/callback.component';
import { DashboardComponent } from './landings/home/dashboard/dashboard.component';
import { LateralBarComponent } from './landings/home/lateral-bar/lateral-bar.component';
import { SessionService } from './services/session/session.service';
import { RepositoryListComponent } from './landings/home/repository-list/repository-list.component';
import { SearchBarComponent } from './landings/home/search-bar/search-bar.component';
import { ViewRepoComponent } from './landings/home/view-repo/view-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    DashboardComponent,
    LateralBarComponent,
    RepositoryListComponent,
    SearchBarComponent,
    ViewRepoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
