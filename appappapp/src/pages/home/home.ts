import { Component } from '@angular/core';
import { NavController, App, Events} from 'ionic-angular';

import { Data } from '../../providers/data';

import { Play } from '../play/play';
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
	) {
		this.navController = app.getRootNav()
	}

	ionViewDidLoad() {
		this.dataFirebase.getData();
		this.dataFirebase.music.subscribe((data) => {
			this.element = data;
			this.isLoading = false;
		});
		this.dataFirebase.video.subscribe((data)=>{
			this.elementmv = data;
			this.isVideoLoading = false; 
		});
	}

	play1(link: string, profile: string, tenbh: string, tencs: string) {

		this.navController.push(Play, {}, { animate: true, direction: 'forward'});
		this.dataFirebase.booleantest = true;
		this.dataFirebase.link = link;
		this.dataFirebase.profile = profile;
		this.dataFirebase.tenbh = tenbh;
		this.dataFirebase.tencs = tencs;
	}

	moreBxh(){
		this.navCtrl.push(Bxh,{},{animate: true, direction: 'forward'})
	}

	moreMv(){
		this.navCtrl.push(ListMv,{},{animate:true, direction: 'forward'})
		
	}

	playvideo(linkmv: string, profilemv: string, tenmv: string, tencsmv: string){
		this.navController.push(PlayVideo, {}, {animate: true, direction: ' forward'});
		this.dataFirebase.linkmv = linkmv;
		this.dataFirebase.tenmv = tenmv;
		this.dataFirebase.profilemv = profilemv;
		this.dataFirebase.tencsmv = tencsmv;	
	}
}
