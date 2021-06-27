import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../models";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId?: string;
  game?: Game;

  private routeSub?: Subscription;
  private gameSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId!);
    })
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.gameSub?.unsubscribe();
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  private getGameDetails(gameId: string) {
    this.gameSub = this.httpService.getGameDetails(gameId)
      .subscribe((game: Game) => {
        this.game = game;
        console.log(game);
        setTimeout(() => this.gameRating = this.game!.metacritic, 1000);
      });
  }
}
