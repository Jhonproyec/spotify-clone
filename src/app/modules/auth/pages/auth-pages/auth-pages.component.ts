import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';


@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrls: ['./auth-pages.component.css']
})
export class AuthPagesComponent implements OnInit{
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router

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
  error_contrasena: boolean = false;
  sendLogin():void{
    const {email, password} = this.formLogin.value;
    if(email == 'test@test.com' && password == '12345'){
      this.router.navigate(['/', 'tracksx'])
      this.error_contrasena = false;
    }else{
      this.error_contrasena = true;
    }
    // this.authService.sendCredentials(email, password).subscribe(response => {
    //   // const {tokenSession, data} = response;
    //   // this.cookie.set('token', tokenSession, 4, '/')
    // }, error => {
    //   const {status, statusText} = error;
    //   console.table([status, statusText]);
    //   console.log(error.error);
    // });
  }

}
