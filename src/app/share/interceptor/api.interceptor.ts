import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';
import { TMDB_ORIGIN } from '@share/utils/constants';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const origin = new URL(req.url).origin
  if (origin === TMDB_ORIGIN) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${environment.tmdbApiKey}`),
    });
    return next(reqWithHeader)
  }
  return next(req);
};
