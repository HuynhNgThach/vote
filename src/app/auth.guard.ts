import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './services/superbase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService)
  const router = inject(Router)
  console.log("in guard", supabase.session)
  const isAuthenticated = await supabase.isAuthenticated()
  console.log("route", route.url.join() === 'dashboard')
  if (!isAuthenticated) {
    return router.navigate(['/signin'])

  }
  return true;
};
