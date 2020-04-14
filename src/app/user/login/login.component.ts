import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel={
    UserName: '',
    Password: ''
  }
  isLoginError : boolean = false;

  constructor(private service:UserService,private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userToken')!=null)
    this.router.navigateByUrl('/home');
  }
  onSubmit(username,password) {
    this.service.userAuthentication(username,password).subscribe(
      (res: any) => {
        localStorage.setItem('userToken', res.access_token);
        localStorage.setItem('userRoles', res.role);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }

}
