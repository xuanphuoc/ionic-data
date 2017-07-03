import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { HomePage } from '../../pages/home/home';

@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class Account{
	username: string;
	constructor(public nav: NavController,
				public userData: UserData
		){}

	 ngAfterViewInit() {
    this.getUsername();
  }

	updatePicture(){
    	console.log('Clicked to update picture');
	}

	changeInfo(){
		console.log('Clicked to update infomation');
	}

	onLogout(){
		this.userData.logout();
		this.nav.push(HomePage);
	}

	 getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

}