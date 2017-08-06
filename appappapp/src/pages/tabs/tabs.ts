import { Component } from '@angular/core';

import { NavController, Events, Platform, LoadingController, ToastController } from 'ionic-angular';

import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

declare var cordova: any;

import { SearchPage } from '../search/search';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { Data } from '../../providers/data';
import { Song } from '../../pages/song/song';


@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page',
  providers: [HomePage],
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UserPage;
  tab4Root = SettingPage;

  degree: number = 0;
  degree1: number = 0;
  nameIcon: string = "pause";
  isPlaying: boolean;
  interVal: any;
  timeInterVal: any;
  seekInterVal: any;
  audio: MediaObject;
  second: number;
  minute: number;
  currentTime: number = 0;
  currentSecond: number;
  currentMinute: number;
  value: number = 0;
  maxValue: number;
  position: number;
  source: string;
  profile: string;
  index: number;

  shuffle_mode: boolean = false;
  repeat_mode: boolean = false;
  favorite_song: boolean = false;

  storageDirectory: string = '';

  listSong: any[] = [];// list of song will save here, use next or previous or another mode

  newSong: Song[] = [];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public dataFirebase: Data,
    public loadingController: LoadingController,
    public home: HomePage,
    public event: Events,
    public media: MediaPlugin,
    public toastCtrl: ToastController,
    public transfer: FileTransfer,
    public file: File,
  ) {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        console.log('no dv');

        return false;
      }
      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
        console.log('ios');

      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
        console.log('android');

      }
      else {
        console.log('false');

        return false;
      }
    });
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    document.getElementById('tool').style.display = "none";
    document.getElementById('player').style.display = "none";
    document.getElementById('about').style.display = "none";
    document.getElementById('sharein').style.display = "none";
    document.getElementById('shareout').style.display = "none";
    this.event.subscribe('rotate:true', () => {
      this.prepareAudio(
        this.dataFirebase.link,
        this.dataFirebase.profile,
        this.dataFirebase.tenbh,
        this.dataFirebase.tencs,
        this.dataFirebase.duration
      );
      this.listSong.push(this.dataFirebase.getSong[0]);
      for (let i = 0; i < this.listSong.length; i++) {
        for (let ii = 0; ii < this.listSong.length; ii++) {
          if (this.listSong[i].link == this.listSong[ii].link && i != ii) {
            this.listSong.splice(i, 1);
          }
        }
      }
      this.index = this.listSong.length - 1;
    });
    this.event.subscribe('videoplaying:true', (mode) => {
      this.isPlaying = mode;
      if (this.isPlaying) {
        this.pause();
      }
    });

    this.event.subscribe('list:true', () => {
      this.listSong = this.dataFirebase.getSong;
      for (let i = 0; i < this.listSong.length; i++) {
        for (let ii = 0; ii < this.listSong.length; ii++) {
          if (this.listSong[i].link == this.listSong[ii].link && i != ii) {
            this.listSong.splice(i, 1);
          }
        }
      }
      this.index = 0;
      this.prepareAudio(
        this.listSong[0].link,
        this.listSong[0].profile,
        this.listSong[0].tenbh,
        this.listSong[0].tencs,
        this.listSong[0].duration
      );
    });

    this.event.subscribe('listoffline', (data, index) => {
      this.listSong = data;
      this.index = index;
      this.prepareAudio(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration
      );
    });

    this.event.subscribe('info', (song, actor, profile) => {
      document.getElementById('songabout').style.display = "block";
      document.getElementById('songinfo').textContent = song;
      document.getElementById('actorinfo').textContent = actor;
      document.getElementById('songinfo2').textContent = song;
      document.getElementById('actorinfo2').textContent = actor;
      this.profile = profile;
    });
  }

  goPlayer() {
    document.getElementById('home').style.display = "none";
    document.getElementById('player').style.display = "block";
    document.getElementById('tool').style.display = "none";
  }

  backHome() {
    document.getElementById('player').style.display = "none";
    document.getElementById('home').style.display = "block";
    document.getElementById('tool').style.display = "block";
  }

  prepareAudio(
    link: string,
    profile: string,
    tenbh: string,
    tencs: string,
    duration: string,
  ) {
    clearInterval(this.interVal);
    clearInterval(this.timeInterVal);
    clearInterval(this.seekInterVal);

    document.getElementById('home').style.display = "none";
    document.getElementById('tool').style.display = "none";
    document.getElementById('player').style.display = "block";
    this.nameIcon = "pause";
    this.audio = this.media.create(link);
    this.source = profile;
    document.getElementById('tenbh').textContent = tenbh;
    document.getElementById('tencs').textContent = tencs;
    document.getElementById('tenbh1').textContent = tenbh;
    document.getElementById('tencs1').textContent = tencs;
    document.getElementById('songinfo1').textContent = tenbh;
    document.getElementById('actorinfo1').textContent = tencs;
    document.getElementById('songinfo3').textContent = tenbh;
    document.getElementById('actorinfo3').textContent = tencs;
    document.getElementById('player').style.backgroundImage = 'url(' + profile + ')';
    document.getElementById('tool').style.backgroundImage = 'url(' + profile + ')';
    document.getElementById('list').style.backgroundImage = 'url(' + profile + ')';
    this.audio.play();
    this.second = parseInt(duration) % 60;
    this.minute = (parseInt(duration) - this.second) / 60;
    this.maxValue = parseInt(duration);
    this.interVal = setInterval(() => {
      document.getElementById('rotate').style.transform = "rotate(" + this.degree + "deg)";
      this.degree += 0.8;
      document.getElementById('rotate1').style.transform = "rotate(" + this.degree1 + "deg)";
      this.degree1 += 0.15;
    }, 40);
    this.timeInterVal = setInterval(() => {
      this.currentTime += 1;
      this.currentSecond = this.currentTime % 60;
      this.currentMinute = (this.currentTime - this.currentSecond) / 60;
      if (this.currentTime >= parseInt(duration)) {
        clearInterval(this.timeInterVal);
        if (this.repeat_mode) {
          this.playWhenClick(
            this.listSong[this.index].link,
            this.listSong[this.index].profile,
            this.listSong[this.index].tenbh,
            this.listSong[this.index].tencs,
            this.listSong[this.index].duration,
          );
        } else {
          if (this.index < this.listSong.length - 1) {
            this.index = this.index + 1;
            this.playWhenClick(
              this.listSong[this.index].link,
              this.listSong[this.index].profile,
              this.listSong[this.index].tenbh,
              this.listSong[this.index].tencs,
              this.listSong[this.index].duration,
            );
          } else {
            this.index = 0;
            this.playWhenClick(
              this.listSong[this.index].link,
              this.listSong[this.index].profile,
              this.listSong[this.index].tenbh,
              this.listSong[this.index].tencs,
              this.listSong[this.index].duration,
            );
          }
        }
        console.log(this.currentTime);
      }
    }, 1000);
    this.seekInterVal = setInterval(() => {
      this.value += 0.1;
      if (this.value >= parseInt(duration)) {
        clearInterval(this.seekInterVal);
      }
    }, 100);
    // this.index = this.listSong.length - 1;
    this.currentTime = 0;
    this.currentSecond = 0;
    this.currentMinute = 0;
    this.value = 0;
  }

  pause() {
    if (this.audio != null) {
      this.audio.pause();
      clearInterval(this.interVal);
      this.nameIcon = "play";
      // document.getElementById('tool').style.display = "none"
    }
  }

  showPlayerBar() {
    if (this.dataFirebase.link == null) {
      console.log('null');

    } else {
      console.log('not null');

    }
  }

  controlPlayer(position: number) {
    this.audio.seekTo(position * 1000);
    this.interVal
  }

  changeButton(getIcon: string) {
    if (this.nameIcon === 'play') {
      this.nameIcon = "pause";
      this.audio.play();
      this.interVal = setInterval(() => {
        document.getElementById('rotate').style.transform = "rotate(" + this.degree + "deg)";
        this.degree += 0.8;
        document.getElementById('rotate1').style.transform = "rotate(" + this.degree1 + "deg)";
        this.degree1 += 0.15;
      }, 40);
      this.timeInterVal = setInterval(() => {
        this.currentTime += 1;
        this.currentSecond = this.currentTime % 60;
        this.currentMinute = (this.currentTime - this.currentSecond) / 60;
        if (this.currentTime >= parseInt(this.dataFirebase.duration)) {
          clearInterval(this.timeInterVal);
        }
      }, 1000);
      this.seekInterVal = setInterval(() => {
        this.value += 0.1;
        if ((this.value * 10) >= this.maxValue) {
          clearInterval(this.timeInterVal);
        }
      }, 100);
    } else if (this.nameIcon === 'pause') {
      this.nameIcon = "play";
      this.audio.pause();
      clearInterval(this.interVal);
      clearInterval(this.timeInterVal);
      clearInterval(this.seekInterVal);
    }
  }

  showList() {
    document.getElementById('list').style.display = "block";
    document.getElementById('player').style.display = "none";
  }

  hideList() {
    document.getElementById('list').style.display = "none";
    document.getElementById('player').style.display = "block";
  }

  playWhenClick(link: string, profile: string, tenbh: string, tencs: string, duration: string) {
    this.prepareAudio(
      link,
      profile,
      tenbh,
      tencs,
      duration
    );
    document.getElementById('list').style.display = "none";
    document.getElementById('player').style.display = "block";
  }

  playFromList(link: string, profile: string, tenbh: string, tencs: string, duration: string, index: number) {
    this.index = index;
    this.prepareAudio(
      link,
      profile,
      tenbh,
      tencs,
      duration
    );
    document.getElementById('list').style.display = "none";
    document.getElementById('player').style.display = "block";
  }


  nextSong() {
    if (this.shuffle_mode) {
      this.index = Math.floor(Math.random() * this.listSong.length) + 0;
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    } else {
      this.index = this.index + 1;
      if (this.index > this.listSong.length - 1) {
        this.index = 0
      } else {
        this.index = this.index;
      }
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    }
  }

  nextSongHome() {
    if (this.shuffle_mode) {
      this.index = Math.floor(Math.random() * this.listSong.length) + 0;
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    } else {
      this.index = this.index + 1;
      if (this.index > this.listSong.length - 1) {
        this.index = 0
      } else {
        this.index = this.index;
      }
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    }
    document.getElementById('player').style.display = "none";
    document.getElementById('home').style.display = "block";
  }

  previousSong() {
    if (this.shuffle_mode) {
      this.index = Math.floor(Math.random() * this.listSong.length) + 0;
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    } else {
      this.index = this.index - 1;
      if (this.index < 0) {
        this.index = this.listSong.length - 1;
      } else {
        this.index = this.index
      }
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    }
  }

  previousSongHome() {
    if (this.shuffle_mode) {
      this.index = Math.floor(Math.random() * this.listSong.length) + 0;
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    } else {
      this.index = this.index - 1;
      if (this.index < 0) {
        this.index = this.listSong.length - 1;
      } else {
        this.index = this.index
      }
      this.playWhenClick(
        this.listSong[this.index].link,
        this.listSong[this.index].profile,
        this.listSong[this.index].tenbh,
        this.listSong[this.index].tencs,
        this.listSong[this.index].duration,
      );
    }
    document.getElementById('player').style.display = "none";
    document.getElementById('home').style.display = "block";
  }

  shuffleMode() {
    if (this.shuffle_mode) {
      this.shuffle_mode = false;
      document.getElementById('shuffle').style.color = "black";
    } else {
      this.shuffle_mode = true;
      document.getElementById('shuffle').style.color = "orange";
    }
  }

  repeatMode() {
    if (this.repeat_mode) {
      this.repeat_mode = false;
      document.getElementById('repeat').style.color = "black";
    } else {
      this.repeat_mode = true;
      document.getElementById('repeat').style.color = "orange";
    }
  }

  favoriteSong() {
    let toast;
    if (this.favorite_song) {
      this.favorite_song = false;
      document.getElementById('like').style.color = "black";
      toast = this.toastCtrl.create({
        message: 'Xóa bài hát khỏi danh sách yêu thích',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    } else {
      this.favorite_song = true;
      document.getElementById('like').style.color = "orange";
      toast = this.toastCtrl.create({
        message: 'Thêm bài hát vào danh sách yêu thích',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
  }

  showInfo() {
    document.getElementById('about').style.display = "block";
  }
  closeInfo() {
    document.getElementById('about').style.display = "none";
  }
  showShare() {
    document.getElementById('songabout').style.display = "none";
    document.getElementById('shareout').style.display = "block";
  }
  closeShare() {
    document.getElementById('shareout').style.display = "none";
  }
  showShare1() {
    document.getElementById('sharein').style.display = "block";
  }
  closeShare1() {
    document.getElementById('sharein').style.display = "none";
  }

  downloadFile(data: Response): void {
    let blob = new Blob([data.blob()], {type: "test/pdf"});
    let url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  closeCheckInfo() {
    document.getElementById('songabout').style.display = "none";
  }

}
