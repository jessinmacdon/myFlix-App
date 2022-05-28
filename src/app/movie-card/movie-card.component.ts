import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favouriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  /**
   * Gets movies - sets the movies state to return a JSON file - Api call
   * @returns array holding movies objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Gets favourite movies and sets the favourite movies variable to return a JSON file
   * @returns array holding ids of user's favorite movies
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
      this.favouriteMovies = resp;
      return this.favouriteMovies;
    });
  }

  /**
   * checks if a movie is included in the user's list of favourite movies
   * @param id 
   * @returns true, if the movie exists in the favourite movie list, else false
   */
  isFav(Id: string): boolean {
    return this.favouriteMovies.includes(Id)
  }

  /**
  * opens the genre dialog from GenreComponent to displaying details about the movie genre
  * @param name
  * @param description
  */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
  * opens the user director info dialog from DirectorComponent to display director details
  * @param name
  * @param bio
  */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
      // set dialog width
      width: '500px'
    });

  }

  /**
 * opens the user synopsis dialog from Synopsis Component to displaying details about the movie
 * @param title
 * @param description
 */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // set dialog width
      width: '500px'
    });

  }

  /**
   * API call(post) to add a movie to a user's list of favourite movies 
   * @param id 
   */
  addToFavouriteMovies(id: string): void {
    this.fetchApiData.addFavouriteMovie(id).subscribe((result) => {
      this.snackBar.open('Successfully added movie to favourites!', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    })
  }

  /**
   * API call(delete) to delete a movie from a user's list of favourite movies 
   * @param id 
   */
  removeFromFavouriteMovies(id: string): void {
    this.fetchApiData.removeFavouriteMovie(id).subscribe((result) => {
      this.snackBar.open('Successfully removed movie from favourites!', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    })
  }

}