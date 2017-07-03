import { Component, ViewChild } from '@angular/core';
import { Nav,Platform, MenuController, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SpeakerPage } from '../pages/speaker/speaker';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { AboutPage } from '../pages/about/about';

import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Account } from '../pages/account/account';

import { UserData } from '../providers/user-data';


export interface PageInterface{
  title: string;
  name: string;
  component: any;
  icon: string;
  logOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;

  rootPage:any = HomePage;
  activePage: any;

  goPages: PageInterface[];
  goPageLogin: PageInterface[];
  goPageLogout: PageInterface[];
 constructor(public platform: Platform,
             public menu: MenuController,
             public events: Events,
             public userData: UserData,
             public splashScreen: SplashScreen,
   ) {
   this.initializeApp();
   this.goPages= [
     {title: 'Schedule', name: 'HomePage', component: HomePage, icon: 'calendar', index:0,tabComponent: SchedulePage},
     {title: 'Speaker', name: 'HomePage', component: HomePage, icon: 'microphone', index:1, tabComponent: SpeakerPage},
     {title: 'Map', name: 'HomePage', component: HomePage, icon: 'map', index:2, tabComponent: MapPage},
     {title: 'About', name: 'HomePage', component: HomePage, icon: 'information-circle', index: 3,tabComponent: AboutPage}
   ];
   this.goPageLogin= [
     {title: 'Account', name: 'Account', component: Account, icon: 'contact' },
     {title: 'Logout', name: 'HomePage', component: HomePage, icon: 'log-out', logOut: true},
   ];
   this.goPageLogout= [
     {title: 'Login', name:'Login', component: Login, icon: 'log-in' },
     {title: 'Signup', name: 'Signup', component: Signup, icon: 'person-add'},
   ];
  this.enableMenu(true);
  this.eventLogin();

 }
 initializeApp(){
   this.platform.ready().then(() => {
     this.splashScreen.hide();
   });
 }
 openPage(page) {
   let params = {};
   if(page.index){
     params = { tabIndex: page.index};
   }
   if(this.nav.getActiveChildNav() && page.index != undefined){
     this.nav.getActiveChildNav().select(page.index);
   } else{
     this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
   }
   if(page.logOut ===true){
     this.userData.logout();
   }
 }
 enableMenu(loggedIn: boolean){
   this.menu.enable(loggedIn,'isLogin');
   this.menu.enable(!loggedIn, 'isLogout')
 }

 eventLogin(){
   this.events.subscribe('user:login',()=>{
     this.enableMenu(true);
   });
   this.events.subscribe('user:signup',() =>{
     this.enableMenu(true);
   });
   this.events.subscribe('user:logout',()=>{
     this.enableMenu(false);
   })
 }

 isActive(page){
   let childNav = this.nav.getActiveChildNav();
   if(childNav){
     if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
       return 'primary';
     }
     return;
   }

   if(this.nav.getActive()&& this.nav.getActive().name === page.name){
     return 'primary';
   }
   return
 }

}

  