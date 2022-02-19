import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  message:string = null;
  @Input() parentMessage:string = null;
  @Output() messageEventParent = new EventEmitter<string>();

  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.receiveMulticastData();
  }

  sendMessageToParentCompnent(message:string): void {
    this.messageEventParent.emit(message);
  }

  receiveMulticastData():void {
    this.userservice.transferData.subscribe((res: any) => {
      if(res.component == "child") {
        this.parentMessage = res.message;
      }
    });
  }
}