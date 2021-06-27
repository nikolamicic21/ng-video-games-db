import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import { environment as env } from "../../environments/environment";
import {ApiResponse, Game} from "../models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<ApiResponse<Game>> {
    const params = new HttpParams().set('ordering', ordering);
    if (search) {
      params.set('search', search);
    }

    return this.httpClient.get<ApiResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfo = this.httpClient.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailers = this.httpClient.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshots = this.httpClient.get(`${env.BASE_URL}/games/${id}/screenshots`)

    return forkJoin({
      gameInfo,
      gameTrailers,
      gameScreenshots
    }).pipe(
      map((response: any) => {
        return {
          ...response['gameInfo'],
          screenshots: response['gameScreenshots']?.results,
          trailers: response['gameTrailers']?.results
        };
      })
    )
  }
}
