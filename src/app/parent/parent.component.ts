import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  message:string = null;
  myMessageToChild:string = null;
  childMessage:string = null;
  
  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.receiveMulticastData();
  }

  sendMessageToChild(message):void {
    this.myMessageToChild = message;
  }

  showChildMessage(message:string):void {
    this.childMessage = message;
  }

  receiveMulticastData():void {
    this.userservice.transferData.subscribe((res: any) => {
      if(res.component == "parent") {
        this.childMessage = res.message;
      }
    });
  }
}
