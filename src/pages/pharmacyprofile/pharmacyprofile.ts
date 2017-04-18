//import { InsurancesListPage } from './../../components/insurances-list/insurances-list';
import { User } from './../../vo/user';
import { Constants } from './../../utils/constants';
import { AppService } from './../../services/app-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

/*
  Generated class for the Pharmacyprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pharmacyprofile',
  templateUrl: 'pharmacyprofile.html'
})
export class PharmacyprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public appServ:AppService,
              public modalCtrl:ModalController) {}

  

  private user: User = new User();
  /*private hideDob: boolean;
  private hideAddress: boolean;*/
  //private primary: string;
  //private secondary: string;
  private primary: string = Constants.PNAME;
  private secondary: string = Constants.PCNUMBER;
  private mfRange: any = { lower: 9, upper: 18 };
  //private mfRangeT: any;
  private satRange: any = { lower: 9, upper: 12 };
  private sunRange: any = { lower: 9, upper: 12 };


  ionViewDidLoad() {
    //console.log('ionViewDidLoad PharmacyprofilePage');
    //this.mfRange = { lower: 9, upper: 18 };
    //this.mfRange = { lower: 9, upper: 18 };
    //this.mfRange = { lower: 9, upper: 18 };
    //let lowerObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.lower);
    //let upperObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.upper);
    //this.mfRangeT = { lower: lowerObj, upper: upperObj };

    //this.mfRange.lower = 9;
    //this.mfRange.upper = 18;
    /*this.insurances = [
      {id:1, name: 'AARP'},
      {id:2, name: 'AATNA'},
      {id:3, name: 'Blue Cross'}
    ];*/

    /*if(this.appServ.customerType === Constants.PHARMACY) {
      this.primary = Constants.PNAME;
      this.secondary = Constants.PCNUMBER;
      this.hideDob = true;
      this.hideAddress = false;

    }else {//customer
      this.primary = Constants.FNAME;
      this.secondary = Constants.LNAME;
      this.hideDob = false;
      this.hideAddress = true;
    }*/
  }

  presentInsurancesModal() {
    //let modal = this.modalCtrl.create(InsurancesListPage);
    //modal.present();
  }

  save() {

  }

  onChange(event) {
    //console.log(event.value);
    /*this.mfRange = { lower: event.value.lower, upper: event.value.upper };
    let lowerObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.lower);
    let upperObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.upper);
    this.mfRangeT = { lower: lowerObj, upper: upperObj };*/
  }

  

}
