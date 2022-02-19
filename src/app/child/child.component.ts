import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  message:string = null;
  @Input() parentMessage:string = null;
  @Output() messageEventParent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  sendMessageToParentCompnent(message:string): void {
    this.messageEventParent.emit(message);
  }
}