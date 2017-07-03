import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakerPage } from '../pages/speaker/speaker';
import { ReadDataProvider } from '../providers/read-data/read-data';
import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Account } from '../pages/account/account';
import { SessionDetail } from '../pages/sessiondetail/sessiondetail';
import { SpeakerDetail } from '../pages/speakerdetail/speakerdetail';

import { UserData } from '../providers/user-data';
import { ReadData } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SpeakerPage,
    MapPage,
    SchedulePage,
    AboutPage,
    Login,
    Signup,
    Account,
    SessionDetail,
    SpeakerDetail
  ],
  imports: [
    BrowserModule,
    HttpModule,  
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: HomePage, name: 'HomePage',segment: 'homepage'},
        {component: SchedulePage, name: 'SchedulePage',segment: 'schedulepage'},
        {component: SpeakerPage, name: 'Speaker', segment: 'speaker'},
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: Login, name: 'Login', segment: 'login' },
        { component: Account, name: 'Account', segment: 'account' },
        { component: Signup, name: 'Signup', segment: 'signup' },
        { component: SessionDetail, name: 'SessionDetail', segment: 'sessionDetail/:name' },
        { component: SpeakerDetail, name: 'SpeakerDetail', segment: 'speakerDetail/:name' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SpeakerPage,
    MapPage,
    SchedulePage,
    AboutPage,
    Login,
    Signup,
    Account,
    SessionDetail,
    SpeakerDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    ReadData,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReadDataProvider
  ]
})
export class AppModule {}
