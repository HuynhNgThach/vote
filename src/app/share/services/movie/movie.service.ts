import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IMovieResp } from '@share/models/movie';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiClient: HttpClient) {
    this.tmdbUrl = environment.tmdbUrl
  }
  popularTotalPage: number | undefined
  tmdbUrl: string

  async getPopularMovies(page: number) {
    if (this.popularTotalPage && page >= this.popularTotalPage) {
      return
    }
    const resp = await lastValueFrom(this.apiClient.get<IMovieResp>(`${this.tmdbUrl}/popular?language=en-US&page=${page}`))
    this.popularTotalPage = resp.total_pages
    return resp.results
  }
}
