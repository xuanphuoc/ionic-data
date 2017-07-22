import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Data } from '../../providers/data';

import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';

import { TabsPage } from '../../pages/tabs/tabs';

@Component({
    selector: 'playvideo-page',
    templateUrl: 'playvideo.html',
})
export class PlayVideo {
    videoOptions: VideoOptions;

    video: string;
    constructor(
        public videoPlayer: VideoPlayer,
        public navCtrl: NavController,
        public dataFirebase: Data,
    ) { }

    ionViewDidLoad() {
        this.video = this.dataFirebase.linkmv;
    }

    goBack() {
        this.navCtrl.pop();
    }

    playvideo() {
        this.videoOptions = { volume: 1.0 };
        this.videoPlayer.play(this.dataFirebase.linkmv).then(() => {
            console.log('video complete!');
        }).catch(err => {
            console.log(err);

        });
    }
    stopvideo() {
        this.videoPlayer.close()
        console.log('stop video!');

    }
}