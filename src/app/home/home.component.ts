import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { userType } from '../../model/user';
import { buildNewTransaction, transactionType } from '../../model/transaction';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home';
  loggedUser?: userType;
  isAuthenticated = false;
  doDeposit = false;
  doWithdrawal = false;
  showActionList = false; //Historic
  amountValue = ""; //Amount
  actionError = false; //Error
  actionSucess = false; //Success
  actionAmount = false; //Message if you don't have the amount on your account

  public displayedColumns = ['id', 'type', 'value', 'date'];
  public dataSource = new MatTableDataSource<transactionType>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let user = this.userService.getUser()
    if (user === undefined) {
      this.isAuthenticated = false;
      this.goToLogin();
    } else {
      this.loggedUser = user;
      this.dataSource.data = user.transactions;
      this.isAuthenticated = true;
    }
  }

  logout(): void {
    this.userService.signOut();
    this.isAuthenticated = false;
    this.goToLogin();
  }

  goToLogin(): void {
    this.router.navigate(['/login', {}]);
  }

  //Deposit button
  doDepositClick(): void {
    this.doDeposit = true;
    this.doWithdrawal = false;
    this.showActionList = false;
    this.amountValue = "";
    this.actionSucess = false;
    this.actionError = false;
    this.actionAmount = false;
  }

  //Withdrawal button
  doWithdrawalClick(): void {
    this.doDeposit = false;
    this.doWithdrawal = true;
    this.showActionList = false;
    this.amountValue = "";
    this.actionSucess = false;
    this.actionError = false;
    this.actionAmount = false;
  }

  //Show action list button
  showActionListClick(): void {
    this.doDeposit = false;
    this.doWithdrawal = false;
    this.showActionList = true;
    this.actionAmount = false;
  }

  onSubmitDeposit(): void {
    const valueToDepoist = parseInt(this.amountValue);

    //Validate if its an invalid number to deposit
    if (isNaN(valueToDepoist) || !isFinite(valueToDepoist) || valueToDepoist <= 0) {
      this.actionError = true;
      this.actionSucess = false;
      return;
    } else {
      if (this.loggedUser !== undefined) {
        this.loggedUser.accountValue += valueToDepoist;
        this.loggedUser.transactions.push(buildNewTransaction(valueToDepoist, "deposit"))
        this.dataSource.data = this.loggedUser.transactions;
        this.userService.saveUser(this.loggedUser)
        this.amountValue = "";
        this.actionSucess = true;
        this.actionError = false;
      }
    }
  }

  onSubmitWithdraw(): void {
    const valueToWithdraw = parseInt(this.amountValue);

    //Validate if its an invalid number to withdraw
    if (isNaN(valueToWithdraw) || !isFinite(valueToWithdraw) || valueToWithdraw <= 0) {
      this.actionError = true;
      this.actionSucess = false;
      return;
    } else {
      if (this.loggedUser !== undefined) {

        //Check to see if you have the amount to withdraw on your account
        if (this.loggedUser.accountValue > valueToWithdraw) {

          this.loggedUser.accountValue -= valueToWithdraw;
          this.loggedUser.transactions.push(buildNewTransaction(valueToWithdraw, "withdrawal"))
          this.dataSource.data = this.loggedUser.transactions;
          this.userService.saveUser(this.loggedUser)
          this.amountValue = "";
          this.actionSucess = true;
          this.actionError = false;

        }
        //If you don't have, a message appear
        else {
          this.actionAmount = true;
        }

      }

    }
  }

}
