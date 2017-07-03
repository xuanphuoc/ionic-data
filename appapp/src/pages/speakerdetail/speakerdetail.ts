import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetail } from '../sessiondetail/sessiondetail';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speakerdetail.html'
})
export class SpeakerDetail {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data.speaker;
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetail, { 
      name: session.name,
      session: session
    });
  }
}