import { Constants } from './../../utils/constants';
import { CustomerProfileService } from './../../providers/customer-profile-service';
import { AppService } from './../../services/app-service';
import { NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'add-address',
  templateUrl: 'add-address.html',
  providers:[CustomerProfileService]
})
export class AddAddress{
    constructor(public navParams: NavParams, 
                public viewCtrl: ViewController,
                public appServ: AppService,
                public custProfileServ: CustomerProfileService,
                public toastCtrl: ToastController,
                public loadingCtrl: LoadingController ) {

    }

    private hideName: boolean;
    private name: string;
    private address1: string;
    private zipCode: number;
    private addressId: number;
    private mode: number;
    private addEditLabel: string;

    ionViewDidLoad() {
        this.hideName = this.navParams.get('hideName');
        this.mode = this.navParams.get('mode');
        let address = this.navParams.get('address');
        if(this.mode === Constants.ADD) {
            this.addEditLabel = 'Add';
        }else if(this.mode === Constants.EDIT) {
            this.addEditLabel = 'Edit';
            this.address1 = address.Address;
            this.zipCode = address.ZipCode;
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    add() {
        let message: string = '';
        if(this.address1 === '' || this.address1 === undefined) {
            message = 'Please enter your address.';
        }else if(this.zipCode === undefined) {
            message = 'Please enter your Zip Code.';
        }else if(String(this.zipCode).length !== 5) {
            message = 'Please enter valid 5 digit Zip Code.';
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
    }

    save() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
        this.custProfileServ.insertUpdateCustomerAddress(this.address1, this.zipCode, this.addressId)
            .subscribe(
                (data) => {
                    loading.dismiss();
                    if(data && data.length > 0 && data[0]['RESULT'] === '1') {
                        this.viewCtrl.dismiss({
                            AddressID: data[0]['AddressID'],
                            name: this.name, 
                            Address: this.address1, 
                            ZipCode: this.zipCode
                        });
                    }
                },
                (err) => {
                    loading.dismiss();
                    let toast = this.toastCtrl.create({
                        message: Constants.ERROR_MESSAGE,
                        duration: 3000,
                        position: 'bottom',
                        cssClass: 'toast-fail'
                    });
                    toast.present();
                }
            );
    }
}