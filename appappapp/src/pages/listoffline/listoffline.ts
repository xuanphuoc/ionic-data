import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Song } from '../../pages/song/song';

@Component({
    selector: 'listoffline-page',
    templateUrl: 'listoffline.html',
})
export class ListOffline {

    profile: string;
    link: string;
    tenbh: string;
    tencs: string;
    duration: string;

    index: number;

    listSong: Song[] = [{
        link: 'asset/music/song1.mp3',
        profile: 'assets/profile/quangtacaiboong.jpg',
        tenbh: 'Quăng ta cái boong',
        tencs: 'Huỳnh James, Pjnboy',
        duration: '249'
    }];

    path: string = 'assets/music/song1.mp3';
    constructor(
        public navCtrl: NavController,
        public dataFirebase: Data,
        public event: Events,
    ) { }

    goBack() {
        this.navCtrl.pop({ animate: true, direction: 'back' })
    }

    ionViewDidLoad() {
    }

    play(index: number) {
        this.index = index;
        this.event.publish('listoffline', this.listSong,this.index);
    }

}