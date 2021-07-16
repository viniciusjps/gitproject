import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userData: undefined;
  private state: any = { isLogged: false, access: undefined };

  constructor() { }

  public logIn(access: any): void {
    this.state = { isLogged: true, access };
    this.userData = undefined;
    Object.keys(access).map(item => {
      localStorage.setItem(item, access[item]);
    });
  }

  public logOut(): void {
    this.state = { isLogged: false, access: undefined };
    this.userData = undefined;
    localStorage.clear();
  }

  public setUserData(user: any): void {
    this.userData = user;
  }

  public getUserData(): any {
    return this.userData;
  }

  public getAccessCode(): any {
    return this.state.access;
  }

  public isLogged(): boolean {
    return this.state.isLogged;
  }


}
