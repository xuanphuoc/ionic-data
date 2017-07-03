import { Component } from '@angular/core';
import { NavController,ActionSheetController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ReadData } from '../../providers/data';

import { SessionDetail } from '../../pages/sessiondetail/sessiondetail';
import { SpeakerDetail } from '../../pages/speakerdetail/speakerdetail';



@Component({
  selector: 'page-speaker',
  templateUrl: 'speaker.html'
})
export class SpeakerPage{

	speakers: any[] = [];
	constructor(public navCtrl: NavController,
				      public readData: ReadData,
              public inAppBrowser: InAppBrowser,
              public actionSheetCtrl: ActionSheetController
		){}

	  ionViewDidLoad() {
      this.readData.getSpeakers().subscribe((speakers: any[]) => {
        this.speakers = speakers;
      });
  	}

  	goSessionDetail(session: any){
  		this.navCtrl.push(SessionDetail, {
      	name: session.name,
      	session: session
    	});
  	}

  	goSpeakerDetail(speakerName: any){
  		this.navCtrl.push(SpeakerDetail, {
        speaker: speakerName,
        name: speakerName.name
      });
  	}

    goFacebook(speaker: any){
      this.inAppBrowser.create(`https://www.facebook.com/${speaker.facebook}`,'_blank')
    }

    goShare(speaker: any){
      let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://facebook.com/' + speaker.facebook);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy('https://facebook.com/' + speaker.facebook);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
    }
}