import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-about',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchKey: string = '';
  song: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public dataFirebase: Data,
  ) {}

  ionViewDidLoad() {
    this.setFilterItem();
  }

  setFilterItem() {
    this.song = this.dataFirebase.filterItem(this.searchKey);
  }
}
