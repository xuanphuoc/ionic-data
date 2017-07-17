import { Injectable } from '@angular/core';

import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

import { HomePage } from '../pages/home/home';
@Injectable()
export class Data{
	music: FirebaseListObservable<any>;
	profile: string;
	link: string;
	tenbh: string;
	tencs:string;

	constructor(public fireBase: AngularFireDatabase,
		){	
	}

	getData(){
		this.music = this.fireBase.list('/music');
	}
}