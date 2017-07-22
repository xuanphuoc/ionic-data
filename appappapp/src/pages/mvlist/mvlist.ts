import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Data } from '../../providers/data';

import { PlayVideo } from '../../pages/playvideo/playvideo';

@Component({
    selector: 'mvlist-page',
    templateUrl: 'mvlist.html',
})
export class ListMv {
    listMv: any[] = [];
    isLoading: boolean = true;
    navController: NavController;
    constructor(
        public dataFirebase: Data,
        public navCtrl: NavController,
        public app: App,
    ) {
        this.navController = app.getRootNav();
    }
    ionViewDidLoad() {
        this.dataFirebase.getData();
        this.dataFirebase.video.subscribe((data) => {
            this.listMv = data;
            this.isLoading = false;
        })
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
    }
}