import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  message:string = null;
  myMessageToChild:string = null;
  childMessage:string = null;
  
  constructor() { }

  ngOnInit() {
  }

  sendMessageToChild(message):void {
    this.myMessageToChild = message;
  }

  showChildMessage(message:string):void {
    this.childMessage = message;
  }

}
