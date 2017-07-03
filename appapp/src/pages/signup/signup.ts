import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserData } from '../../providers/user-data';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class Signup {
	signup: {username?: string, password?: string}={};
	submitted = false;
  	constructor(public navCtrl: NavController,
  				public userData: UserData
  	) {}

  	onSignup(form: NgForm){
  		this.submitted = true;
  		if(form.valid){
  			this.userData.signup(this.signup.username);
  			this.navCtrl.push(HomePage);
  		}
  	}
}