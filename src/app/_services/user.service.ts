import { Injectable } from '@angular/core';
import {userType} from '../../model/user';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: userType): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): userType | undefined {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return undefined;
  }
}
