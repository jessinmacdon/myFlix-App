import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data from api, then sets the user variable to returned a JSON file
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    })
  }

  /**
   * opens the edit profile dialog from EditProfileComponent allowing a user to edit/update their profile
   */
  openEditProfileDialog(): void {
    console.log("this.user --> ", this.user)
    this.dialog.open(EditProfileComponent, {
      width: '300px',
      data: { userData: this.user }
    })
  }

  /**
   * Deletes a user account - then redirects user back to the welcome page
   * @function deleteUser
   */
  deleteProfile(): void {
    if (confirm('This action will delete your account, all your saved data will be lost. Are you sure you want to continue?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
