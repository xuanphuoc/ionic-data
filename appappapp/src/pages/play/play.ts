import {Component} from '@angular/core';

import { NavController } from 'ionic-angular';

// import { MediaPlugin } from 'ionic-native';

import { RadioPlayer } from '../../app/radio/radio';

import { TabsPage } from '../tabs/tabs';

const onStatusUpdate = (status) => console.log(status);
const onSuccess = () => console.log('Action is successful.');
const onError = (error) => console.error(error.message);

@Component({
	selector: 'play-page',
	templateUrl: 'play.html',
	providers: [RadioPlayer]
})

export class Play{
	player: any;
	degree: number;
	constructor(public navCtrl: NavController,
				player: RadioPlayer
		){
		this.player = player;
		this.degree = 0;
	}

	ionViewDidLoad(){
		this.rotate();
	}

	backTabs(){
		this.navCtrl.push(TabsPage);
	}
	



	play(){

		this.player.play();
	}

	pause(){
		this.player.pause();
	}

	rotate(){
		setInterval(()=>{
			document.getElementById('image').style.transform = "rotate("+ this.degree +"deg)";
			this.degree +=0.1;
		}, 40);
	}
}