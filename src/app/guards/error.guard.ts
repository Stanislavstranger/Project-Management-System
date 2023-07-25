import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorGuard implements CanActivate {
  constructor(private errorService: ErrorService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.errorService.isError()) {
        return false;
      }
      return true;
  }
}
