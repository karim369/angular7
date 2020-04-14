import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userClaims;

  constructor(private router:Router,private service:UserService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.userClaims = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  onLogout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user/login']);
  }

}
