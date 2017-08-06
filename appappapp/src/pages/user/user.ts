import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { UserInfo } from '../../pages/userinfo/userinfo';
import { ListOffline } from '../../pages/listoffline/listoffline';

@Component({
  selector: 'user-page',
  templateUrl: 'user.html'
})
export class UserPage {
  navController: NavController;
  constructor(
    public navCtrl: NavController,
    public app: App,
  ) {
    this.navController = app.getRootNav();
  }

  goUserInfo() {
    this.navCtrl.push(UserInfo);
  }

  goListoffline() {
    this.navCtrl.push(ListOffline, {}, { animate: true, direction: ' forward' });
  }
}
