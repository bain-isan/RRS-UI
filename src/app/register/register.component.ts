import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { RegisterService } from '../services/register.service';
import { Register } from '../shared/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pipe = new DatePipe('en-US');
  public maxDate?:any;
  public classMsg = "";
  public message = '';
  date?: any;
  public register = new Register('', '', this.date, '', '', '')
  public genders = ['Male', 'Female', 'Others'];

  constructor(
    private _service: RegisterService,
    private _router:Router
    ) { }

  ngOnInit(): void {

    let yr = new Date().getFullYear() - 18;
    let preDate = new Date().setFullYear(yr);
    this.maxDate = this.pipe.transform(preDate, 'YYYY-MM-dd');
  }
  onSubmit() {
    this.message = '';
    this.classMsg = '';
    this._service.userRegister(this.register).subscribe(
      value => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.classMsg = "alert-success";
        this.message = 'Your UserId: ' + value.userId;
        setTimeout(()=>{this._router.navigate(['Login'])},2500);
      },
      error => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.classMsg = "alert-danger";
        if (error.error.msg != undefined)
          this.message = error.error.msg;
        if (error.error.detail != undefined)
          this.message = error.error.detail;
        
        console.log(error);
      }
    )
  }

  checkAdult(){
    if(this.register.Dob < this.maxDate){
      return true;
    }
    return false;
  }

}
