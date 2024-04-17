import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = enviroment.api;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

//   sendCredentials(email: string, password: string): Observable<any>{
//     const body = {email, password};
//     return this.http.post(`${this.URL}/auth/login`, body)
//     .pipe( 
//       tap((response : any) => {
//         const {tokenSession, data} = response;
//         this.router.navigate(['/', 'tracksx'])
//       })
//     )
//   }
}
