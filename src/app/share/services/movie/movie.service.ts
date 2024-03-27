import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovie, IMovieResp } from '@share/models/movie';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiClient: HttpClient) { }
  totalPage: number | undefined

  async getPopularMovies(page: number) {
    if (this.totalPage && page >= this.totalPage) {
      return
    }
    const resp = await lastValueFrom(this.apiClient.get<IMovieResp>(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`))
    console.log(resp.results)
    this.totalPage = resp.total_pages
    return resp.results
  }
}
