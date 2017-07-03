import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserData } from '../../providers/user-data';

import { Signup } from '../../pages/signup/signup';
import { HomePage } from '../../pages/home/home';

@Component({
	selector:'page-user',
	templateUrl:'login.html',
})
export class Login{
	login: {username?: string,password?: string}={};
	submitted = false;
	constructor(public navCtrl: NavController,
				public userData: UserData
		){}

	onLogin(form: NgForm){
		this.submitted = true;
		if(form.valid){
			this.userData.login(this.login.username);
			this.navCtrl.push(HomePage);
		}
	}

	onSignup(){
		this.navCtrl.push(Signup)
	}
}