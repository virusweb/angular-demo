import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-msg',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() type:string = 'info';
  @Input() dismissible: boolean = true;
  @Input() strongMsg: string = 'Info : ';
  @Input() message: string = 'Alert Message';
  
  constructor() { }

  ngOnInit() {
  }

}
