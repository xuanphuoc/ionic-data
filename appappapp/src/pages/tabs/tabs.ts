import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { Play } from '../play/play';

import { Data } from '../../providers/data';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page',
  providers: [HomePage, Play],
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UserPage;
  tab4Root = SettingPage;

  degree: number = 0;
  nameIcon: string = "play";
  display: any;
  start: boolean;
  interVal: any;

  constructor(
    public navCtrl: NavController,
    public dataFirebase: Data,
    public home: HomePage,
    public event: Events,
    public playPage: Play,
  ) {
    this.event.subscribe('roate:true',(roate)=>{
      this.start = roate;
      console.log(this.start);
      
    })
  }

  ionViewDidLoad() {
    document.getElementById('tool').style.display = "none";
  }

  goPlay() {
    this.navCtrl.pop({animate: true, direction: 'forward' })
  }

  rotate() {
    this.interVal = setInterval(() => {
      document.getElementById('rotate').style.transform = "rotate(" + this.degree + "deg)";
      this.degree += 0.8;
    }, 40);
  }

  changeButton(getIcon: string) {
    if (this.nameIcon === 'play') {
      this.nameIcon = "pause";
      this.interVal = setInterval(() => {
        document.getElementById('rotate').style.transform = "rotate(" + this.degree + "deg)";
        this.degree += 0.8;
      }, 40);
      this.dataFirebase.booleantest = true;
      console.log(this.dataFirebase.booleantest);
      
    } else if (this.nameIcon === 'pause') {
      this.nameIcon = "play";      
      clearInterval(this.interVal);
      this.dataFirebase.booleantest = false;     
      console.log(this.dataFirebase.booleantest); 
    }
  }

}
