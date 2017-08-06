import { Component } from '@angular/core';
import { NavController, App, Events } from 'ionic-angular';

import { Data } from '../../providers/data';

import { PlayVideo } from '../../pages/playvideo/playvideo';

@Component({
    selector: 'mvlist-page',
    templateUrl: 'mvlist.html',
})
export class ListMv {
    listMv: Array<any> = [];
    itemRight: any[] = [];
    itemLeft: any[] = [];
    isLoading: boolean = true;
    navController: NavController;
    constructor(
        public dataFirebase: Data,
        public navCtrl: NavController,
        public app: App,
        public event: Events,
    ) {
        this.navController = app.getRootNav();
    }
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
    }

    goBack() {
        this.navCtrl.pop({ animate: true, direction: 'back' });
    }
    playvideo(linkmv: string, profilemv: string, tenmv: string, tencsmv: string) {
        this.navController.push(PlayVideo, {}, { animate: true, direction: 'back' });
        this.dataFirebase.linkmv = linkmv;
        this.dataFirebase.tenmv = tenmv;
        this.dataFirebase.profilemv = profilemv;
        this.dataFirebase.tencsmv = tencsmv;
        this.dataFirebase.isPlaying = true;
		this.event.publish('videoplaying:true', this.dataFirebase.isPlaying);
    }
}