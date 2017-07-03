import { Component, ViewChild } from '@angular/core';
import { NavController, List, App, FabContainer, LoadingController } from 'ionic-angular';

import { ReadData } from '../../providers/data';
import { UserData } from '../../providers/user-data';

import { SessionDetail } from '../sessiondetail/sessiondetail';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

	@ViewChild('scheduleList', { read: List }) scheduleList: List;
	dayIndex = 0;
	segment= 'all';
	groups: any = [];
	confDate: string;
	queryText: '';
	excludeTracks: any =[];
	shownSessions: any = [];

  	constructor(public navCtrl: NavController,
  				public userData: UserData,
  				public readData: ReadData,
  				public app: App,
          public loadingCtrl: LoadingController
  		) {}

  	ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  	}

  	updateSchedule() {
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.readData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  	}

  	goSession(sessionData: any){
  		this.navCtrl.push(SessionDetail,{
  			name: sessionData.name,
  			session: sessionData
  		});
  	}

    openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }


}