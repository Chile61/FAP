import { AddInsurance } from './../../components/add-insurance/add-insurance';
import { HomePage } from './../home/home';
import { CustomerProfileService } from './../../providers/customer-profile-service';
import { AddAddress } from './../../components/add-address/add-address';
import { AppService } from './../../services/app-service';
import { Constants } from './../../utils/constants';
import { User } from './../../vo/user';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the Customerprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customerprofile',
  templateUrl: 'customerprofile.html',
  providers:[CustomerProfileService]
})
export class CustomerprofilePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public custProfileServ: CustomerProfileService,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {}

  private title: string;
  private user: User = new User();
  private primary: string = Constants.FNAME;
  private secondary: string = Constants.LNAME;

  private addresses = [];
  private insurances = [];
  private doctors = [];
  private children = [];

  //ionViewDidLoad() {
  ionViewDidEnter() {
    this.user.gender = 'm';
    let cs: number = this.navParams.get('currentState');
    this.currentState = cs;

    //this.currentState = this.appServ.customerProfileState;
    switch(this.currentState) {
      case Constants.MY_INFO:
        //this.appServ.customerProfileState = 1;
        this.title = 'About yourself';
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.custProfileServ.getCustomer().subscribe(
          data => {
            //alert(JSON.stringify(data));
            loading.dismiss();
            if(data && data.length > 0) {
              this.user.primary = data[0]['FirstName'];
              this.user.secondary = data[0]['LastName'];
              this.user.gender = data[0]['Gender'];
              this.user.dob = data[0]['DOB'];
            }
          },
          error => {
            loading.dismiss();
            alert('getCustomer error');
          }
        );
      break;
      case Constants.MY_INFO_ADDRESS:
        this.title = 'Add your delivery addresses';
        loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.custProfileServ.getCustomerAddresses().subscribe(
          data => {
            //alert(JSON.stringify(data));
            loading.dismiss();
            if(data && data.length > 0) {
              this.addresses = data;
            }
          },
          error => {
            loading.dismiss();
            alert('getCustomerAddresses error');
          }
        );
      break;
      case Constants.MY_INFO_INSURANCE:
        this.title = 'Add your insurances';
        loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.custProfileServ.getCustomerInsurances().subscribe(
          data => {
            //alert(JSON.stringify(data));
            loading.dismiss();
            if(data && data.length > 0) {
              this.insurances = data;
              //alert('result');
              //alert(JSON.stringify(data));
            }
          },
          err => {
            loading.dismiss();
            //alert(JSON.stringify(err));
            //alert('err');
            alert('getCustomerInsurances error');
          }
        );
      break;
      case Constants.MY_INFO_DOCTOR:
        this.title = 'Add your Doctor details';
      break;
      case Constants.MY_INFO_CHILDREN:
        this.title = 'Add your children details';
      break;
      case Constants.MY_INFO_OTHERS:
        this.title = 'Other information';
      break;
    }
  }
  
  /*ionViewDidLeave() {
    if(this.appServ.customerProfileState > 5) {
      this.appServ.customerProfileState = 1;
    }else {
      this.appServ.customerProfileState--;
    }
  }*/

  private currentState: number;
  
  onAddressClick(address) {
    switch(this.currentState) {
      case Constants.MY_INFO_ADDRESS:
        //alert(JSON.stringify(address));
        let modal = this.modalCtrl.create(AddAddress, {hideName: true, mode: Constants.EDIT, address});
        modal.onDidDismiss((data) => {
          if(data) {
            //data = {"addressId":"21","address1":"bbbbb cccc","zipCode":"11112"}
            //addresses = [{"addressId":"26","address1":"addddd","zipCode":"55555"}]
            //alert(JSON.stringify(data));
            let index = this.addresses.findIndex(x => x.AddressID === address.AddressID);
            //alert(JSON.stringify(this.addresses));
            this.addresses[index]['Address'] = data.Address;
            this.addresses[index]['ZipCode'] = data.ZipCode;
            //this.addresses.push(data);
          }
        });
        modal.present();
      break;
    }
  }

  onInsuranceClick(ins) {
    let modal = this.modalCtrl.create(AddInsurance, {hideName: true, mode: Constants.EDIT, ins});
        modal.onDidDismiss((data) => {
          if(data) {
            //data = {"addressId":"21","address1":"bbbbb cccc","zipCode":"11112"}
            //addresses = [{"addressId":"26","address1":"addddd","zipCode":"55555"}]
            //alert(JSON.stringify(data));
            let index = this.addresses.findIndex(x => x.CustomerInsuranceID === ins.CustomerInsuranceID);
            //alert(JSON.stringify(this.addresses));
            this.insurances[index]['Address'] = data.Address;
            this.insurances[index]['ZipCode'] = data.ZipCode;
            //this.addresses.push(data);
          }
        });
        modal.present();
      
  }

  validate() {
    switch(this.currentState) {
      case Constants.MY_INFO:
        let message: string = '';
        if(this.user.primary === undefined || this.user.primary === '') {
          message = 'Please enter your first name.';
        }else if(this.user.secondary === undefined || this.user.secondary === '') {
          message = 'Please enter your last name.';
        }else if(this.user.dob === undefined) {
          message = 'Please enter your date of birth.';
        }

        if(message === '') {
          this.save();

        }else {
          let toast = this.toastCtrl.create({
                message,
                duration: 3000,
                position: 'bottom',
                cssClass: 'toast-fail'
              });
              toast.present();
        }
      break;
      case Constants.MY_INFO_ADDRESS:
        if(this.addresses.length > 0) {
          this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_INSURANCE}, {animate: true, direction: 'forward'});
        
        }else {
          let toast = this.toastCtrl.create({
            message: "Add atleast 1 delivery address.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      break;
      case Constants.MY_INFO_INSURANCE:
        //this.title = 'Insurance';
        this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_DOCTOR}, {animate: true, direction: 'forward'});
      break;
      case Constants.MY_INFO_DOCTOR:
        this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_CHILDREN}, {animate: true, direction: 'forward'});
      break;
      case Constants.MY_INFO_CHILDREN:
        this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_OTHERS}, {animate: true, direction: 'forward'});
      break;
      case Constants.MY_INFO_OTHERS:
        this.navCtrl.push(HomePage, {}, {animate: true, direction: 'forward'});
        //this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_CHILDREN}, {animate: true, direction: 'forward'});
      break;
    }
  }

  save() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    switch(this.currentState) {
      case Constants.MY_INFO:
        this.custProfileServ.updateCustomerMyInfo(this.user.primary, this.user.secondary,
        this.user.gender, this.user.dob)
          .subscribe(
            (data) => {
              //alert(JSON.stringify(data));
              loading.dismiss();
              if(data && data.length > 0 && data[0]['RESULT'] == '1') {
                this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_ADDRESS}, {animate: true, direction: 'forward'});
              }
            },
            () => {
              loading.dismiss();
              alert('insert info error');
            }
          );
      break;
      case Constants.MY_INFO_ADDRESS:
        
      break;
      case Constants.MY_INFO_INSURANCE:
        this.title = 'Insurance';
      break;
      case Constants.MY_INFO_DOCTOR:
        this.title = 'Doctor';
      break;
      case Constants.MY_INFO_CHILDREN:
        this.title = 'Children';
      break;
      case Constants.MY_INFO_OTHERS:
        this.title = 'Other information';
      break;
    }
    //this.appServ.customerProfileState++;
    //this.navCtrl.push(CustomerprofilePage, {}, {animate: true, direction: 'forward'});
  }  

  onAdd() {
    switch(this.currentState) {
      case Constants.MY_INFO_ADDRESS:
        let modal = this.modalCtrl.create(AddAddress, {hideName: true, mode: Constants.ADD});
        modal.onDidDismiss((data) => {
          if(data) {
            this.addresses.push(data);
          }
        });
        modal.present();
      break;
      case Constants.MY_INFO_INSURANCE:
        //update my info and increment next stage
        modal = this.modalCtrl.create(AddInsurance, {mode: Constants.ADD});
        modal.onDidDismiss((data) => {
          if(data) {
            //alert(JSON.stringify(data));
            this.insurances.push(data);
          }
        });
        modal.present();
      break;
      case Constants.MY_INFO_DOCTOR:
        //update my info and increment next stage
      break;
      case Constants.MY_INFO_CHILDREN:
        //update my info and increment next stage
      break;
      case Constants.MY_INFO_OTHERS:
        //update my info and increment next stage
      break;
    }
  }

  skip() {
    switch(this.currentState) {
      case Constants.MY_INFO_INSURANCE:
        this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_DOCTOR}, {animate: true, direction: 'forward'});
      break;
      case Constants.MY_INFO_DOCTOR:
        this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_CHILDREN}, {animate: true, direction: 'forward'});
      break;
      case Constants.MY_INFO_CHILDREN:
        this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_OTHERS}, {animate: true, direction: 'forward'});
      break;
      case Constants.MY_INFO_OTHERS:
        this.navCtrl.push(HomePage, {}, {animate: true, direction: 'forward'});
        //this.navCtrl.push(CustomerprofilePage, {currentState: Constants.MY_INFO_CHILDREN}, {animate: true, direction: 'forward'});
      break;
    }
  }
  
  showLoading() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      return loading;
    //loading.present();
  }
}
