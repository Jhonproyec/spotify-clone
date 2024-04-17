import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.checkCookieSession();
    return true;
  }

  // checkCookieSession():boolean{
  //   // try {
  //   //   const token = this.cookie.check('token');
  //   //   if(token){
  //   //     return true;
  //   //   }else{
  //   //     this.router.navigate(['/', 'auth'])
  //   //     return false;
  //   //   }
      
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   return false
  //   // }
  // }
  
}
