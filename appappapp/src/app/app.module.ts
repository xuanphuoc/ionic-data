import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Data } from '../providers/data';

import { StreamingMedia } from '@ionic-native/streaming-media';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

import { SearchPage } from '../pages/search/search';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';

import { UserInfo } from '../pages/userinfo/userinfo';

import { Play } from '../pages/play/play';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig={
  apiKey: "AIzaSyDEnRfnGXde5TOZAx_Im4Dtsin1ITjGBPs",
  authDomain: "mprojec-dc77d.firebaseapp.com",
  databaseURL: "https://mprojec-dc77d.firebaseio.com",
  projectId: "mprojec-dc77d",
  storageBucket: "mprojec-dc77d.appspot.com",
  messagingSenderId: "682712634763"
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    
    SearchPage,
    SettingPage,
    HomePage,
    UserPage,

    UserInfo,
    Play
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,

    SearchPage,
    SettingPage,
    HomePage,
    UserPage,

    UserInfo,
    Play
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    AngularFireDatabase,
    Data,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StreamingMedia,
  ]
})
export class AppModule {}
