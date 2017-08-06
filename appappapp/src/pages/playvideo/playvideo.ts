import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Data } from '../../providers/data';

import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';

// import { TabsPage } from '../../pages/tabs/tabs';

@Component({
    selector: 'playvideo-page',
    templateUrl: 'playvideo.html',
})
export class PlayVideo {
    videoOptions: VideoOptions;
    video: string;
    listMv: any[] = [];
    itemRight: any[] = [];
    itemLeft: any[] = [];
    isLoading: boolean = true;

    constructor(
        public videoPlayer: VideoPlayer,
        public navCtrl: NavController,
        public dataFirebase: Data,
    ) { }

    ionViewDidLoad() {
        this.dataFirebase.getData();
        this.dataFirebase.video.subscribe((data) => {
            this.listMv = data;
            for (let i = 0; i < this.listMv.length; i++) {
                if ((i % 2) == 0) {
                    this.listMv[i];// ???
                    this.itemLeft.push(this.listMv[i]);
                } else if ((i % 2) == 1) {
                    this.itemRight.push(this.listMv[i]);
                }
            }
            this.isLoading = false;
        });
        this.video = this.dataFirebase.linkmv;
    }

    goBack() {
        this.dataFirebase.isPlaying = false;
        this.navCtrl.pop();
    }
    playMv(link: string, profile: string, tenmv: string, tencsmv: string) {
        this.video = link;        
    }
}