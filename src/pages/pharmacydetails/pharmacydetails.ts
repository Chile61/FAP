import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Pharmacydetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pharmacydetails',
  templateUrl: 'pharmacydetails.html'
})
export class PharmacydetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  private pharma: Object = {};
  private pics: Array<Object>;
  ionViewDidLoad() {
    //console.log('ionViewDidLoad PharmacydetailsPage');
    this.pharma = this.navParams.get('selectedPharma');
    this.pics = [];
  }

  private picId: number = 0;
  takePic() {
    this.picId++;
    let newPic = {id: this.picId, base64Code:'', location: ''};
    this.pics.push(newPic);
  }
}
