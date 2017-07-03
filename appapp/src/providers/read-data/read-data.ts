import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ReadDataProvider {

  constructor(public http: Http) {
    console.log('Hello ReadDataProvider Provider');
  }

  getData(){
  	this.http.get('aaaaaa').map(res => res.json()).subscribe(data =>{
  		console.log(data);
  	})
  }

  loadData(){
  	return this.http.get('/assets/data/data.json').map(res => res.json())
  	

  
  }

}
