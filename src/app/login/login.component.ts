import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import {buildNewUser} from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginValid = false;
  public username = '';
  public password = '';


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let loggedUser = this.userService.getUser()
    if (loggedUser !== undefined) {
      this.loginValid = true;
      this.goToHome();
    }
  }

  onSubmit(): void {
    let user = buildNewUser(this.username, this.password);
    this.userService.saveUser(user);
    this.loginValid = true;
    this.goToHome();
  }

  goToHome(): void {
    this.router.navigate(['/home', {}]);
  }
}

