import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Data } from '../../providers/data';

import { Play } from '../play/play';

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
    play(link: string, profile: string, tenbh: string, tencs: string){
        this.navController.push(Play, {}, { animate: true, direction: 'forward'});
		this.dataFirebase.booleantest = true;
		this.dataFirebase.link = link;
		this.dataFirebase.profile = profile;
		this.dataFirebase.tenbh = tenbh;
        this.dataFirebase.tencs = tencs;
    }
}