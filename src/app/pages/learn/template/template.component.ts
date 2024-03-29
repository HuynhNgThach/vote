import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IMovie, IReviewer } from '@share/models/movie';
import { MovieService } from '@share/services/movie/movie.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [],
  templateUrl: './template.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemplateComponent implements OnInit {
  movieLoading = false
  selectedMovie!: IMovie
  reviewers: Array<IReviewer> = [
    {
      name: "Kaido",
      avaUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      textReview: 'Where can i download?'
    },
    {
      name: "Rachel",
      avaUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww',
      textReview: '😍😍😍 Wooow... this is amazing movie'
    },
    {
      name: "Synta",
      avaUrl: 'https://plus.unsplash.com/premium_photo-1675034377239-a839117fe934?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
      textReview: 'Nice movie'
    },
    {
      name: "Nobita",
      avaUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
      textReview: 'Nice movie'
    },
    {
      name: "Shizuka",
      avaUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
      textReview: 'Wooow... this is amazing'
    },

  ]
  movies: Array<IMovie> = [
  ]
  swiperConfig: SwiperOptions = {
    slidesPerView: 4,

  }
  @ViewChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  initialized = false;
  page = 1

  get shortTilte() {
    return this.selectedMovie.overview.slice(0, 150) + '...'
  }
  get activeSlide() {
    return this.movies.findIndex(i => i.id === this.selectedMovie.id)
  }
  constructor(private movieService: MovieService) {

  }
  ngOnInit(): void {
    this.loadMovies(this.page)
  }
  handleSelectMovie(id: number) {
    const movie = this.movies.find(i => i.id === id)
    if (!movie) {
      return
    }
    this.selectedMovie = movie
    window.requestAnimationFrame(() => {

      this.swiperRef.nativeElement.swiper.slideTo(this.activeSlide)

    })
  }
  handleReachEnd() {
    this.page++
    this.loadMovies(this.page)
    console.log("end")
  }
  async loadMovies(page: number) {


    const newMovie = await this.movieService.getPopularMovies(page) ?? []
    this.movies = [...this.movies, ...newMovie]
    this.selectedMovie = this.selectedMovie ? this.selectedMovie : this.movies[0]

  }

}
