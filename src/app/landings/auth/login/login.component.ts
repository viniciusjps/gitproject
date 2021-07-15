import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public login(): void {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${environment.github_client_id}&redirect_uri=${environment.github_redirect_uri}`;
  }

}
