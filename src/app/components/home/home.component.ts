import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiResponse, Game} from "../../models";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string = '';
  games: Game[] = [];

  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacritic', params['game-search']);
      } else {
        this.searchGames('metacritic');
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.gameSub?.unsubscribe();
  }

  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService.getGameList(sort, search)
      .subscribe((gameList: ApiResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: string) {
    this.router.navigate(['details', id]);
  }
}
