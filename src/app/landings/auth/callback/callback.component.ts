import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import axios from 'axios';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  public status: any = { loading: true, error: false };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const code = query['code'];
      if (code) {
        this.getAccessToken(code);
      } else {
        this.router.navigate(['']);
      };
    });
  }

  /**
   * Method to get the access token for the github data
   * @param code Github's code access
   */
  private getAccessToken(code: string): void {
    const payload = {
      client_id: environment.github_client_id,
      client_secret: environment.github_secret_key,
      code,
      redirect_uri: environment.callback_uri
    };
    axios.post(environment.API_ENDPOINT + '/auth/access_token', payload)
      .then(res => {
        this.status.loading = false;
        if (res.data.error) {
          this.status.error = true;
        } else {
          this.session.logIn(res.data);
          this.router.navigate(['']);
        }
      }).catch(err => {
        this.status.error = true;
      });
  }

  public backLogin(): void {
    this.router.navigate(['auth/login']);
  }

}
