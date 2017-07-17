import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Play } from '../play/play';

import { SettingPage} from '../setting/setting';

import { TabsPage } from '../tabs/tabs';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	element : Array<any>=[];
	isLoading: boolean = true;
	stream: any;
	promise: any;
	navController: NavController;
	constructor(public navCtrl: NavController,
		public dataFirebase: Data, public app: App
		) {
		this.navController = app.getRootNav()
	}

	ionViewDidLoad(){
		this.dataFirebase.getData();
		this.dataFirebase.music.subscribe((data)=>{
			this.element = data;
			this.isLoading = false;
		});
	}

	play(link: string){
		this.stream = new Audio(link);
		this.stream.play();
		this.promise = new Promise((resolve,reject)=>{
			this.stream.addEventListener('playing',()=>{
				resolve(true);
			});
			this.stream.addEventListener('error', () =>{
				reject(false)
			});
		});

		return this.promise;
	}
	play1(link: string, profile: string, tenbh: string, tencs: string){
		this.stream = new Audio(link);
		// this.stream.play();

		this.navController.push(Play);
		this.promise = new Promise((resolve,reject)=>{
			this.stream.addEventListener('playing',()=>{
				resolve(true);
			});
			this.stream.addEventListener('error', () =>{
				reject(false)
			});
		});
		this.dataFirebase.link = link;
		this.dataFirebase.profile = profile;
		this.dataFirebase.tenbh = tenbh;
		this.dataFirebase.tencs = tencs;

		return this.promise;
	}
}
