import { ConfirmuserdetailsPage } from './../confirmuserdetails/confirmuserdetails';
import { PharmacydetailsPage } from './../pharmacydetails/pharmacydetails';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the Pharmacieslist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pharmacieslist',
  templateUrl: 'pharmacieslist.html'
})
export class PharmacieslistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}
  private params: any;
  //private addedItems = [];
  private pharmacies = [];
  ionViewDidLoad() {
    //console.log('ionViewDidLoad PharmacieslistPage');
    if(this.navParams.data) {
      //alert(JSON.stringify(this.navParams.get('pharmacies')));
      this.params = this.navParams.get('params');
      this.pharmacies = this.params.pharmacies;
      //this.images = this.navParams.get('images');
      //this.addedItems = this.navParams.get('addedItems');
    }
    
  }

  
 // private pharmacies: Array<Object>;
  showOptions() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort by');

    alert.addInput({
      type: 'radio',
      label: 'Name',
      value: 'nam',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Delivery',
      value: 'del',
      checked: false
    });
    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });
    alert.present();
  }

  onItemClick(pharma) {
    //this.navCtrl.push(PharmacydetailsPage, {selectedPharma: pharma}, {animate: true, direction: 'forward'});
    /*{"pharmacies":
      [{"PharmacyID":"1","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"},
      {"PharmacyID":"2","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"},
      {"PharmacyID":"3","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"},
      {"PharmacyID":"1","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"}],
      
      "images":[],
      
      "precriptionItems":
      [{"prodName":"5-OAK MIX, BLACKJACK/BUR/POST/RED/WHITE POLLEN","prodId":"5","form":"INJECTION, SOLUTION","strength":".2g/20mL","quantity":"2","noOfRefills":"1"}],
      
      "selectedPharma":
      {"PharmacyID":"2","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"}}
    */
    this.params.pharmacies = [];
    this.params.selectedPharma = pharma;
    //alert(JSON.stringify(this.params));
    this.navCtrl.push(ConfirmuserdetailsPage, {params: this.params}, {animate: true, direction: 'forward'});
  }
}
