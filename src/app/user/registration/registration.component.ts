import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'false-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded=true) {
          this.service.formModel.reset();
          this.toastr.success('User registration successful.');
          
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;
                case 'DuplicateEmail':
                  this.toastr.error('Email is already taken','Registration failed.');
                  break;

              default:
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}