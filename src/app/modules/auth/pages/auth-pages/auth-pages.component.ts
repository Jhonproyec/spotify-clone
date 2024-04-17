import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrls: ['./auth-pages.component.css']
})
export class AuthPagesComponent implements OnInit{
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
  ){}

  ngOnInit():void{
    this.formLogin = new FormGroup({  
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', 
        Validators.compose([ 
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12)
        ])
      )
    });
  }

  sendLogin():void{
    const {email, password} = this.formLogin.value;
    this.authService.sendCredentials(email, password).subscribe(response => {
      // const {tokenSession, data} = response;
      // this.cookie.set('token', tokenSession, 4, '/')
    }, error => {
      const {status, statusText} = error;
      console.table([status, statusText]);
      console.log(error.error);
    });
  }

}
