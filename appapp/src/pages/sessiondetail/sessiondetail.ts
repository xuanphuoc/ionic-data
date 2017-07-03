import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({
	selector: 'page-session-detail',
	templateUrl: 'sessiondetail.html',
})
export class SessionDetail{
	session: any;
	constructor(public navParams: NavParams){
		 this.session = navParams.data.session;
	}
}