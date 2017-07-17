import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserInfo } from '../../pages/userinfo/userinfo';

@Component({
  selector: 'user-page',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController) {

  }

  goUserInfo(){
  	this.navCtrl.push(UserInfo);
  }

}
