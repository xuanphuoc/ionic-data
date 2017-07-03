import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ReadData{
	data: any;
	constructor(public http: Http,
				public userData: UserData 
		){}
	load():any{
		if(this.data){
			return Observable.of(this.data);
		}else{
			return this.http.get('assets/data/data1.json').map(this.processData, this)
		}
	}
	processData(data: any){
		this.data = data.json();
		this.data.tracks = [];
		this.data.schedule.forEach((day: any) => {
			day.groups.forEach((group: any) =>{
				group.sessions.forEach((session: any) => {
					session.speakers = [];
					if(session.speakerNames){
						session.speakerNames.forEach((speakerName: any) =>{
							let speaker  = this.data.speakers.find((s: any) => s.name === speakerName);
							if(speaker){
							session.speakers.push(speaker);
							speaker.seassion = speaker.sessions || [];
							speaker.seassion.push(session);
							}
						});
					}
					if(session.tracks){
						session.tracks.forEach((track: any) => {
              				if (this.data.tracks.indexOf(track) < 0) {
                				this.data.tracks.push(track);
              				}	
            			});
					}
				});
				
			});
		}); 

		return this.data;		
	}

	getTimeline(dayIndex: number, queryText = '', excludeTracks: any[] = [], segment = 'all') {
    return this.load().map((data: any) => {
      let day = data.schedule[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');

      day.groups.forEach((group: any) => {
        group.hide = true;

        group.sessions.forEach((session: any) => {
          // this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });
  }
  
  getSpeakers() {
    return this.load().map((data: any) => {
      return data.speakers.sort((a: any, b: any) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  getMap(){
    return this.load().map((data: any) => {
      return data.map;
    });
  }
	
}