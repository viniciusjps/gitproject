import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './services/session/session.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const access_token = localStorage.getItem('access_token') || undefined;
    const token_type = localStorage.getItem('token_type') || undefined;

    if (access_token && token_type) {
      if (!this.session.getUserData()) {
        return axios.get(environment.API_ENDPOINT + `/user?access_token=${access_token}&token_type=${token_type}`)
          .then(res => {
            if (res.data.error) {
              this.router.navigate(['/auth/login']);
              return false;
            } else {
              this.session.logIn({ access_token, token_type });
              this.session.setUserData(res.data);
              return true;
            }
          }).catch(err => {
            this.router.navigate(['/auth/login']);
            return false;
          });
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      this.session.logOut();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}
