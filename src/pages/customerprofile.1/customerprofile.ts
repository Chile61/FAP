import { Constants } from './../../utils/constants';
import { User } from './../../vo/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Customerprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customerprofile',
  templateUrl: 'customerprofile.html'
})
export class CustomerprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  private user: User = new User();
  private primary: string = Constants.FNAME;
  private secondary: string = Constants.LNAME;
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerprofilePage');
    
  }
  private hideMyInfo: boolean = true;
  private hideMyDocInfo: boolean = true;
  private hideAddresses: boolean = true;
  private hideHistory: boolean = true;
  private hideInsurance: boolean = true;
  private hideChild: boolean = true;
  toggleMyInfo() {
    this.hideMyInfo = !this.hideMyInfo;
  }

  toggleMyDocInfo() {
    this.hideMyDocInfo = !this.hideMyDocInfo;
  }

  toggleAddresses() {
    this.hideAddresses = !this.hideAddresses;
  }

  toggleHistory() {
    this.hideHistory = !this.hideHistory;
  }

  toggleInsurance() {
    this.hideInsurance = !this.hideInsurance;
  }

  toggleChild() {
    this.hideChild = !this.hideChild;
  }

  save() {
    
  }  

}
