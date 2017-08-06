import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Song} from '../pages/song/song';

export interface Song{
	link:string;
	profile: string;
	tenbh: string;
	tencs: string;
	duration: string;
}

@Injectable()
export class Data {
	music: FirebaseListObservable<any>;
	video: FirebaseListObservable<any>;
	profile: string;
	link: string;
	tenbh: string;
	tencs: string;
	duration: string;

	linkmv: string;
	profilemv: string;
	tenmv: string;
	tencsmv: string;
	booleantest: boolean;
	isPlaying: boolean = false;

	link_local: string;

	list_music: Array<any> = [];
	items: any;

	headers:Headers;
    bearer: string;

	getSong: Song[]=[
		{link: this.link, profile: this.profile, tenbh: this.tenbh, tencs: this.tencs,duration: this.duration}
	];
	constructor(
		public fireBase: AngularFireDatabase,
		public http: Http,
	) {
		this.fireBase.list('/music').subscribe((data)=>{
			this.list_music = data;
		});
	}

	getData() {
		this.video = this.fireBase.list('/video');
		this.music = this.fireBase.list('/music');
	}

	filterItem(searchKey) {
		return this.list_music.filter((item) => {
			return item.tenbh.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
		});
	}

	getLocal(link){
		this.http.get(link).subscribe(data=>{
			this.link_local = data.url;
		});
	}

	getFile(url:string) {
        this.bearer = 'Bearer '+ localStorage.getItem('currentUser');
        this.headers = new Headers();
        this.headers.append('Authorization', this.bearer);

        return this.http.get(url, {headers: this.headers});
    }
}