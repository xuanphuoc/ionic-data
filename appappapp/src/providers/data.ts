import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class Data {
	music: FirebaseListObservable<any>;
	video: FirebaseListObservable<any>;
	profile: string;
	link: string;
	tenbh: string;
	tencs: string;

	linkmv: string;
	profilemv: string;
	tenmv: string;
	tencsmv: string;
	booleantest: boolean;
	constructor(
		public fireBase: AngularFireDatabase,
	) { }

	getData() {
		this.video = this.fireBase.list('/video');
		this.music = this.fireBase.list('/music');
	}
}