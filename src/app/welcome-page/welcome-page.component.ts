import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
     * opens the user registration dialog(form) when signup button is clicked
     */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // set dialog width
      width: '500px'
    });
  }

  /**
 * opens the user login dialog(form) when login button is clicked
 */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // set dialog width
      width: '500px'
    });
  }
}
