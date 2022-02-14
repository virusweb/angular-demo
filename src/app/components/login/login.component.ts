import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  success = false;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private pubSub: NgxPubSubService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin(): void {
    this.submitted = true;
    this.success = false;

    if(!this.loginForm.valid) {
      return;
    } else {
      this.success = true;
      let username = this.loginForm.value.username.trim();
      let password = this.loginForm.value.password.trim();

      this.authservice.getAuthenticate(username,password).subscribe(res => {
        if(res && res.status && res.data && res.data.token && res.data.role){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('role', res.data.role);
          
          this.pubSub.publishWithHistory('tokenEvent', res.data.token);
          
          if(res.data.role == 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.success = false;
        }
      }, error => {
        this.success = false;
      });      
    }
  }
}