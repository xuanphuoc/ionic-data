import {Component} from '@angular/core';

import { NavController } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';

import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';


import { Data } from '../../providers/data';

@Component({
	selector: 'play-page',
	templateUrl: 'play.html',
})

export class Play{
	nameIcon: string = "pause";
	audio: any;
	degree: number;
	stream: any;
	promise: any;
	url: string;


	constructor(
		public navCtrl: NavController,
		public dataFirebase: Data,
		public streamMedia: StreamingMedia,
		){
		this.degree = 0;

		this.audio = new Audio();
	}

	isLoading: boolean = true;
	ionViewDidLoad(){
		this.rotate();
	}

	startAudio(){
		let options : StreamingAudioOptions = {
			successCallback: () =>{console.log()},
			errorCallback: ()=>{console.log()},
			initFullscreen: false,
		}
		this.streamMedia.playAudio(this.dataFirebase.link, options);
	}
	



	play(){
		this.stream = new Audio(this.dataFirebase.link);
		if(this.nameIcon === 'play'){
			this.nameIcon = "pause";
			this.stream.play();

		}else if(this.nameIcon === 'pause'){
			this.nameIcon = "play";
			this.pause1();

		}
	}

	pause1(){
			this.stream.pause()
		// this.stream = null;
	}

	stop1(){
		if(this.stream !=  null){
			this.stream.pause();
			this.dataFirebase.link = "";
		}
		this.stream = null;
	}

	backTabs(){
		this.navCtrl.push(TabsPage);
	}
	rotate(){
		setInterval(()=>{
			document.getElementById('image').style.transform = "rotate("+ this.degree +"deg)";
			this.degree +=0.1;
		}, 40);
	}

}