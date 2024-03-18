import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './services/superbase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService)
  const router = inject(Router)

  const isAuthenticated = await supabase.isAuthenticated()

  console.log("url", route, state)
  if (isAuthenticated && (['/signin', '/signup'].includes(state.url))) {
    return router.navigate(['/dashboard'])
  }
  if (!isAuthenticated) {
    if (['/signin', '/signup'].includes(state.url)) {
      return true
    }
    return router.navigate(['/signin'])
  }
  return true;
};
