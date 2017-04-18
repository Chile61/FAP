import { TakePicture } from './../../components/take-picture/take-picture';
import { PrescriptionPage } from './../prescription/prescription';
import { Constants } from './../../utils/constants';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

/*
  Generated class for the Customerpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customerpage',
  templateUrl: 'customerpage.html'
})
export class CustomerpagePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController) {}

  private options:Array<{id: number, code: string, name: string}>;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CustomerpagePage');
    this.options = Constants.CUSTOMER_OPTIONS;
  }

  onSelect(option: {id: number, code: string, name: string}) {
    switch(option.code) {
      case 'np': 
        this.navCtrl.push(TakePicture);
        //let modal = this.modalCtrl.create(PrescriptionPage);
        //modal.present();
        /*modal.dismiss((data) => {
          if (data) {
            alert(data.val);
            //this.doChangeEmail(data);
          }
        });*/
      break;
      case 'tr': 
      break;
      case 'rh': 
      break;

    }
    if(option.code === 'np') {

    }
  }

}
