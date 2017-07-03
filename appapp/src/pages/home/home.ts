import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerPage } from '../speaker/speaker';


@Component({
  templateUrl: 'home.html'
})
export class HomePage {
	rootPage1: any = SchedulePage;
	rootPage2: any = SpeakerPage;
	rootPage3: any = MapPage;
	rootPage4: any = AboutPage;
	selectPage: number;
  	constructor(navParams: NavParams ) {
  		this.selectPage = navParams.data.tabIndex || 0;
  	}
}
