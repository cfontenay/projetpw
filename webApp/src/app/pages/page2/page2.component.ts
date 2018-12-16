import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import {SortService} from '../../../services/SortService';
import {APIToolService} from '../../../services/APIToolService';
import {Movie} from '../../../services/objects/Movie';
import {Watchlist} from '../../../services/objects/Watchlist';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';
import {AbstractPage} from '../AbstractPage';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['../page.component.css']
})
export class Page2Component extends AbstractPage implements OnInit {
  static this: any;
  constructor(protected sortService: SortService, protected apiToolService: APIToolService, protected dialog: MatDialog) {
    super(sortService, apiToolService, dialog);
    Page2Component.this = this;
  }
  async ngOnInit() {
    await console.log('ngInit page2');
    /*Tempo*/
    const users = await (await this.apiToolService.getUserService()).getAllUsers();
    await (await this.apiToolService.getUserService()).setConnectedUser(users[0]);
    /*fin tempo*/

    super.handleResponsive(window);
    const connectedUser = await (await this.apiToolService.getUserService()).getConnectedUser();
    const watchlist: Watchlist = await connectedUser.getWatchlist();
    const movies = await(await this.apiToolService.getMovieService()).getMoviesByIds(await watchlist.getMoviesIds());
    await this.sortService.setRawMovies(await this.getId(), movies);
  }
  async update(sortService: SortService) {
    if (await sortService.sortedMoviesHasChanged(await Page2Component.this.getId())) {
      Page2Component.this.movies = await sortService.getSortedMovies(await Page2Component.this.getId());
      Page2Component.this.loading = false;
    }
  }
  getId(): number {
    return 2;
  }

}
