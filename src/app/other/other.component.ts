import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(private userservice:UserService) { }

  ngOnInit() {
  }

  multicast(component:string, message:string) {
    this.userservice.transferData.next({'component':component, 'message':message})
  }

}
