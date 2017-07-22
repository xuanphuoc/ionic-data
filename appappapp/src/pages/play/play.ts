import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';

import { MediaPlugin, MediaObject } from '@ionic-native/media';

import { TabsPage } from '../tabs/tabs';

import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';


import { Data } from '../../providers/data';

const onStatusUpdate = (status) => console.log(status);
const onSuccess = () => console.log('Action is successful.');
const onError = (error) => console.error(error.message);

@Component({
	selector: 'play-page',
	templateUrl: 'play.html',
})
export class Play {
	nameIcon: string = "pause";
	degree: number;
	interVel: any;
	isRotate: boolean;

	constructor(
		public navCtrl: NavController,
		public dataFirebase: Data,
		public streamMedia: StreamingMedia,
		public event: Events,
		public media: MediaPlugin
	) {
		this.degree = 0;
		event.subscribe('mode:true', (mode) => {
			this.isRotate = mode;

		});
	}

	file: MediaObject = this.media.create(this.dataFirebase.link, onStatusUpdate, onSuccess, onError);
	audio = new Audio(this.dataFirebase.link);
	isLoading: boolean = true;
	ionViewDidLoad() {
		this.rotate();
	}

	startAudio() {
		let options: StreamingAudioOptions = {
			successCallback: () => { console.log() },
			errorCallback: () => { console.log() },
			initFullscreen: false,
		}
		this.streamMedia.playAudio(this.dataFirebase.link, options);
	}




	play() {
		if (this.nameIcon === 'play' && !this.isRotate) {
			this.nameIcon = "pause";
			// this.file.play();
			this.audio.play();
			this.interVel = setInterval(() => {
				document.getElementById('image').style.transform = "rotate(" + this.degree + "deg)";
				this.degree += 0.15;
			}, 40);
			this.isRotate = true;
		} else if (this.nameIcon === 'pause' && this.isRotate) {
			this.nameIcon = "play";
			// this.file.pause();
			this.audio.pause();
			clearInterval(this.interVel);
			this.isRotate = false;
		}
	}

	backTabs() {
		this.navCtrl.push(TabsPage, {}, { animate: true, direction: 'back' });
		// this.event.publish('rotate:true',this.isRotate);
		// this.navCtrl.pop({animate: true, direction: 'back'});
	}
	stop() {
		this.audio.pause();
		this.audio.load();
	}
	rotate() {
		this.audio.play();
		this.interVel = setInterval(() => {
			document.getElementById('image').style.transform = "rotate(" + this.degree + "deg)";
			this.degree += 0.1;
		}, 40);
		this.isRotate = true;
	}
}