import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '@share/services';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService)
  const router = inject(Router)

  const isAuthenticated = await supabase.isAuthenticated()

  console.log("url", route, state)
  if (isAuthenticated && (['/auth/signin', '/auth/signup'].includes(state.url))) {
    return router.navigate(['/'])
  }
  if (!isAuthenticated) {
    if (['/auth/signin', '/auth/signup'].includes(state.url)) {
      return true
    }
    return router.navigate(['/auth/signin'])
  }
  return true;
};
