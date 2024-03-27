import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("from api interceptor", req.url)
  const origin = new URL(req.url).origin
  if (origin === 'https://api.themoviedb.org') {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjhhNmYyM2NmNGJjNzNkZjI4NWQ3ZDMxNWU1OTYwYSIsInN1YiI6IjY2MDM5ZDMyN2Y2YzhkMDE2MzcwZjcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nagu2XyLbjcxcCDMDKJ9zOWaQgEWhzlQWtkdM-Aqqhw'),
    });
    return next(reqWithHeader)
  }
  return next(req);
};
