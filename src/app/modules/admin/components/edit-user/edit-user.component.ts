import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  submitEditForm:boolean = false;
  editForm: FormGroup;
  user: any;
  success: boolean = false;

  constructor(
    private userservice: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      employee_code: ['', Validators.required],
      employee_designation: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
    });
    this.getUserData();
  }

  getUserData(): void {
    let userToken = sessionStorage.getItem('userToken');
    if(userToken){
      this.userservice.getSingleUser(userToken).subscribe(res => {
        if(res && res.status && res.user) {
          this.user = res.user;
          this.editForm.patchValue({
            employee_code: this.user.employee_code,
            employee_designation: this.user.employee_designation,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            user_name: this.user.user_name,
          })
        } else {
          this.user = null;
        }
      });
    } else {
      this.user = null;
    }
  }

  doUpdate(): void {
    this.success = false;
    this.submitEditForm = true;
    if(this.editForm.invalid) {
      return;
    } else {
      this.success = true;
    }
  }

  cancel(): void {
    sessionStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}