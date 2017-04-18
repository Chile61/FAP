import { Constants } from './../../utils/constants';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from 'ionic-native';
/*
  Generated class for the Prescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-prescription',
  templateUrl: 'prescription.html'
})
export class PrescriptionPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrescriptionPage');
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }

  okClick() {
      this.viewCtrl.dismiss({val: 'hi'});
  }

  private picId: number = 0;
  //private pics:Array<{picId: number, location: string}>;
  private pics = [];
  private imgSrc: any;
  captureImage(type: string = Constants.CAMERA) {
    //Camera.getPicture(successCallback, errorCallback, options);
    let camType: number;
    if(type === Constants.CAMERA) {
      camType = Camera.PictureSourceType.CAMERA;
    }else {
      camType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
    let options = {
      destinationType: Camera.DestinationType.FILE_URI, 
      sourceType: camType 
    };
    Camera.getPicture(options).then((imgData) => {
        //alert(JSON.stringify(imgData));
        this.imgSrc = imgData;
        //this.imgSrc = "data:image/jpeg;base64," +imgData;
        //this.convertToBase64(imgData);
        this.picId++;
        let newPic = {picId: this.picId, location: this.imgSrc};
        this.pics.push(newPic);

    }, (err) => {
      alert(JSON.stringify(err));
    });
  }

  convertToBase64(path: string) {
    var xhr = new XMLHttpRequest();       
    xhr.open("GET", path, true); 
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      alert(e);
            //console.log(this.response);
           /* var reader = new FileReader();
            reader.onload = function(event) {
               var res = event.target.result;
               console.log(res)
            }
            var file = this.response;
            reader.readAsDataURL(file)*/
    };
    xhr.send()
  }
}
