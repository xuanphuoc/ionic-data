import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { Play } from '../play/play';

import { Data } from '../../providers/data';

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
  nameIcon: string = "play";

  constructor(public navCtrl: NavController,
      public dataFirebase: Data
     ) {
    this.degree = 0;
  }

  ionViewDidLoad(){
    this.rotate(); 
  }

  goPlay(){
  	this.navCtrl.push(Play);
  }

  rotate(){
    setInterval(()=>{
      document.getElementById('rotate1').style.transform = "rotate("+ this.degree +"deg)";
      this.degree +=0.8;
    }, 40);
  }

  changeButton(getIcon: string){
    if(this.nameIcon === 'play'){
      this.nameIcon = "pause";
    }else if (this.nameIcon === 'pause'){
      this.nameIcon = "play";
    }
  }

}
