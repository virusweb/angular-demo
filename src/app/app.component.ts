import { Component } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(pubsub: NgxPubSubService) {
    pubsub.registerEventWithHistory('tokenEvent',5);
  }
}
