import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SessionService } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.scss']
})
export class LateralBarComponent implements OnInit {

  public status = { loading: true, error: false };

  constructor(
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Method to get Github user data
   */
  private getUserData(): void {
    if (!this.session.getUserData()) {
      this.status.loading = true;
      const access = this.session.getAccessCode();
      axios.get(environment.API_ENDPOINT + `/user?access_token=${access.access_token}&token_type=${access.token_type}`)
        .then(res => {
          this.status.loading = false;
          if (res.data.error) {
            this.status.error = true;
          } else {
            this.session.setUserData(res.data);
          }
          console.log(res.data);
        }).catch(err => {
          this.status.error = true;
        });
    } else {
      this.status.loading = false;
    }
  }

  /**
   * Helper to use the user data of session service
   * @returns User data session
   */
  public getLoggedUser(): any {
    return this.session.getUserData();
  }

}
