import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { Play } from '../play/play';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UserPage;
  tab4Root = SettingPage;

  degree: number;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.rotate();
  }

  goPlay(){
  	this.navCtrl.push(Play);
  }

  rotate(){
    setInterval(()=>{
      document.getElementById('profile').style.transform = "rotate("+ this.degree +"deg)";
      this.degree +=10;
    }, 40);
  }



}
