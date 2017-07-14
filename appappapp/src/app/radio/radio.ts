export class RadioPlayer {
  url:string;
  stream:any;
  promise:any;
  
 constructor() {
   this.url = "https://firebasestorage.googleapis.com/v0/b/mprojec-dc77d.appspot.com/o/Music%2FNgayXuaEmDen-AnhKhang_4dmq4.mp3?alt=media&token=e9531845-c879-4e22-a776-f6b7191fb988";
   this.stream = new Audio(this.url);
 };

 play() {
   this.stream.play();
   this.promise = new Promise((resolve,reject) => {
     this.stream.addEventListener('playing', () => {
       resolve(true);
     });

     this.stream.addEventListener('error', () => {
       reject(false);
     });
   });
   
  return this.promise;
};

pause() {
  this.stream.pause();
};

}