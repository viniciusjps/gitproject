import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './landings/auth/callback/callback.component';
import { LoginComponent } from './landings/auth/login/login.component';
import { DashboardComponent } from './landings/home/dashboard/dashboard.component';
import { SessionGuard } from './session.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
