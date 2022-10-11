import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id?:any;
  public login = new Login(this.id, "");
  public message = "";
  
  public classMsg = "";


  constructor(
    private _loginService: LoginService,
    private _router:Router
    ) { }

  ngOnInit(): void { }

  onSubmit() {
    this._loginService.userLogin(this.login).subscribe(
      value => {
        
          this.message = value.msg;
          localStorage.setItem("jwt", value.jwt);
          localStorage.setItem("role", value.role);
          this.classMsg = "alert-success";
          setTimeout(()=>{ this._router.navigate(['/']); }, 2000)
          
          
      },
      error => {
        this.message = error.error.msg;
        this.classMsg = "alert-danger";
        
        console.log(error.error.msg);
      }
    )
  }

}