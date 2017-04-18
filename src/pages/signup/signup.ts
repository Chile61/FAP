import { Constants } from './../../utils/constants';
import { AppService } from './../../services/app-service';
import { LoginPage } from './../login/login';
//import { PharmacysignupPage } from './../pharmacysignup/pharmacysignup';
import { CustomersignupPage } from './../customersignup/customersignup';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appServ: AppService) {}

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad SignupPage');
    this.appServ.getCustomers()
       .subscribe(
         data => {this.customers = data},//alert(JSON.stringify(data)),
         error => alert(JSON.stringify(error))
      );*/
  }

  customerSingup() {
    this.appServ.signUpType = Constants.CUSTOMER;
    //this.navParams.data = { type: this.appServ.customerType };
    this.navCtrl.push(CustomersignupPage, {}, {animate: true, direction: 'forward'});
    //alert(this.appServ.customerType);
    
  }

  pharmacySingup() {
    this.appServ.signUpType = Constants.PHARMACY;
    //this.navParams.data = {type: this.appServ.customerType};
    this.navCtrl.push(CustomersignupPage, {}, {animate: true, direction: 'forward'});
    //alert(this.appServ.customerType);
  }

  goBack() {
    this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'back'});
  }
}
