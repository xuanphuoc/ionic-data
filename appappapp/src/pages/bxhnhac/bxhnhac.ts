import { Component } from '@angular/core';

import { Data } from '../../providers/data';

@Component({
    selector: 'bxhnhac-page',
    templateUrl: 'bxhnhac.html',
})
export class bxhNhac{
    bxh: any[]=[];
    isLoading: boolean = true;
    constructor(
        public dataFirebase: Data,
    ){}
    ionViewDidLoad(){
        this.dataFirebase.getData();
        this.dataFirebase.music.subscribe((data)=>{
            this.bxh = data;
            this.isLoading = false;
        })
    }
} 