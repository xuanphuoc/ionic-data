import {Component} from '@angular/core';

import { NavController } from 'ionic-angular';



import { TabsPage } from '../tabs/tabs';

const onStatusUpdate = (status) => console.log(status);
const onSuccess = () => console.log('Action is successful.');
const onError = (error) => console.error(error.message);

@Component({
	templateUrl: 'play.html'
})

export class Play{
	file;
	constructor(public navCtrl: NavController,
		){}

	backTabs(){
		this.navCtrl.push(TabsPage)
	}
	



	play(){

	}
}