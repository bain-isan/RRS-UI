import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/login';
import { LoginService } from '../services/login.service';



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


  constructor(private _loginService: LoginService) { }

  ngOnInit(): void { }

  onSubmit() {
    this._loginService.userLogin(this.login).subscribe(
      value => {
        if (value.jwt == "") {
          this.message = value.msg;
          this.classMsg = "alert-danger";
          
        }
        else {
          this.message = value.msg;
          localStorage.setItem("jwt", value.jwt);
          this.classMsg = "alert-success";
          
          console.log("No" + value);
        }
        
      },
      error => {
        this.message = error.error.msg;
        this.classMsg = "alert-danger";
        
        console.log(error.error.msg);
      }
    )
  }

}