import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  success: boolean;
  msg: any;
  fname: any;
  lname: any;
  password: any;
  cpassword: any;
  email: any;
  emailNotRegistered: boolean = true;

  constructor(
    private authservice: AuthService,
  ) { }

  doRegister(f): void {
    if (!f.valid && this.emailNotRegistered) {
      this.success = false;
    } else {
      this.success = true;
      this.authservice.register(f.value).subscribe(res => {
        if (res && res.status && res.data) {
          this.msg = res.message;
          f.submitted = false;
          f.reset();
        } else {
          this.success = false;
          this.msg = (res && res.message) ? res.message : null;
        }
      },error => {
        this.success = false;
      });
    }
  }

  checkEmail(): void {
    this.authservice.checkEmail(this.email).subscribe(res => {
      if(res && res.status === true) {
        this.emailNotRegistered = false;
      } else {
        this.emailNotRegistered = true;
      }
    },error => {
      console.log(error);
      this.success = false;
    });
  }
}
