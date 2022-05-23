import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigates to movies (all movies)
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates to user profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out users, clears local storage to reset token 
   * then takes user back to the the main page
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }


}
