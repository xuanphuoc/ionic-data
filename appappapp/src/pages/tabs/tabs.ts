import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { Play } from '../play/play';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UserPage;
  tab4Root = SettingPage;

  constructor(public navCtrl: NavController) {

  }

  goPlay(){
  	this.navCtrl.push(Play);
  }
}
