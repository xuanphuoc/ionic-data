import { Component } from '@angular/core';
import { NavController, App, Events } from 'ionic-angular';

import { Data } from '../../providers/data';

@Component({
    selector: 'bxh-page',
    templateUrl: 'bxh.html',
})
export class Bxh {
    bxh: any[] = [];
    isLoading: boolean = true;
    navController: NavController;
    constructor(
        public navCtrl: NavController,
        public dataFirebase: Data,
        public app: App,
        public event: Events,
    ) {
        this.navController = app.getRootNav();
    }

    ionViewDidLoad() {
        this.dataFirebase.getData();
        this.dataFirebase.music.subscribe((data) => {
            this.bxh = data;
            this.isLoading = false;
        })
    }
    goBack() {
        this.navCtrl.pop({ animate: true, direction: 'back' })
    }
    play(link: string, profile: string, tenbh: string, tencs: string, duration: string) {
        this.dataFirebase.booleantest = true;
        this.dataFirebase.duration = duration;
        this.dataFirebase.link = link;
        this.dataFirebase.profile = profile;
        this.dataFirebase.tenbh = tenbh;
        this.dataFirebase.tencs = tencs;
        this.event.publish('rotate:true', this.dataFirebase.link);
    }

    showInfo(tenbh: string, tencs: string, profile: string) {
        this.dataFirebase.tenbh = tenbh;
        this.dataFirebase.tencs = tencs;
        this.dataFirebase.profile = profile;
        this.event.publish('info', tenbh, tencs, profile);
    }
}