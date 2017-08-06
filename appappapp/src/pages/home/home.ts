import { Component } from '@angular/core';
import { NavController, App, Events, ViewController } from 'ionic-angular';

import { Data } from '../../providers/data';

import { PlayVideo } from '../playvideo/playvideo';

import { Bxh } from '../bxh/bxh';
import { ListMv } from '../mvlist/mvlist';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	element: Array<any> = [];
	elementmv: Array<any> = [];
	isLoading: boolean = true;
	isVideoLoading: boolean = true;
	navController: NavController;

	constructor(
		public navCtrl: NavController,
		public dataFirebase: Data,
		public app: App,
		public event: Events,
		public viewController: ViewController,
	) {
		this.navController = app.getRootNav()
	}

	ionViewDidLoad() {
		this.dataFirebase.getData();
		this.dataFirebase.music.subscribe((data) => {
			this.element = data;
			this.isLoading = false;
		});
		this.dataFirebase.video.subscribe((data) => {
			this.elementmv = data;
			this.isVideoLoading = false;
		});
	}

	audio: any;

	play1(link: string, profile: string, tenbh: string, tencs: string, duration: string) {
		this.dataFirebase.link = link;
		this.dataFirebase.profile = profile;
		this.dataFirebase.tenbh = tenbh;
		this.dataFirebase.tencs = tencs;
		this.dataFirebase.duration = duration;
		this.dataFirebase.booleantest = true;

		this.dataFirebase.getSong = [{ link, profile, tenbh, tencs, duration }];
		this.event.publish('rotate:true', this.dataFirebase.link);
	}

	showInfo(tenbh: string, tencs: string, profile: string){
		this.dataFirebase.tenbh = tenbh;
		this.dataFirebase.tencs = tencs;
		this.dataFirebase.profile = profile;
		this.event.publish('info',tenbh,tencs,profile);
	}

	playList(){
		this.dataFirebase.getSong = this.element;
		this.event.publish('list:true', this.dataFirebase.getSong)
	}

	moreBxh() {
		this.navCtrl.push(Bxh, {}, { animate: true, direction: 'forward' })
	}

	moreMv() {
		this.navCtrl.push(ListMv, {}, { animate: true, direction: 'forward' })

	}

	playvideo(linkmv: string, profilemv: string, tenmv: string, tencsmv: string) {
		this.dataFirebase.linkmv = linkmv;
		this.dataFirebase.tenmv = tenmv;
		this.dataFirebase.profilemv = profilemv;
		this.dataFirebase.tencsmv = tencsmv;
		this.dataFirebase.isPlaying = true;
		this.event.publish('videoplaying:true', this.dataFirebase.isPlaying);
		this.navController.push(PlayVideo, {}, { animate: true, direction: ' forward' });
	}
}
