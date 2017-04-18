import { PrescriptionService } from './../../providers/prescription-service';
import { Search } from './../search/search';
import { Constants } from './../../utils/constants';
import { PrescriptionItem } from './../../vo/prescription-item';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-prescription-entry',
  templateUrl: 'prescription-entry.html',
  providers: [PrescriptionService]
})
export class PrescriptionEntry {
    constructor(public viewCtrl: ViewController, 
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public ps: PrescriptionService,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController){}
    
    private buttonLabel: string;
    private isDeleteHidden: boolean;
    private item: PrescriptionItem = new PrescriptionItem();

    /*private units = [
        {code: 'mg', desc:'mg', selected: false},
        {code: 'dr', desc:'Drops', selected: true},
        {code: 'ml', desc:'mL', selected: false}
    ];*/

    private dosageForms = [];
    private dosageDetails = [];

    /*onSKUClick() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ps.getPacks(this.item.prodId).subscribe(
            data => {
                loading.dismiss();
                if(data && data.length > 0) {
                    let nameModal = this.modalCtrl.create(Search, 
                        {rawItems: data, labelField: 'PackName',
                    title: 'Select pack'});
                    nameModal.onDidDismiss(data => {
                        if(data) {
                            //this.item = data;
                            this.item.skuName = data['PackName'];
                            this.item.skuId = data['PackID'];
                        }
                    })
                    nameModal.present();
                }
            },
            err => {
                loading.dismiss();
                alert('Error in getting products.');
                
            }
        );
    }*/
    
    onNameClick() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ps.getProducts().subscribe(
            data => {
                loading.dismiss();
                if(data && data.length > 0) {
                    let nameModal = this.modalCtrl.create(Search, 
                    {rawItems: data, labelField: 'ProductName',
                title: 'Select product'});
                    nameModal.onDidDismiss(data => {
                        if(data) {
                            //this.item = data;
                            this.item.prodName = data['ProductName'];
                            this.item.prodId = data['ProductID'];
                            
                            this.getDosageForms(data['ProductID']);
                        }
                    })
                    nameModal.present();
                }
            },
            err => {
                loading.dismiss();
                alert('Error in getting products.');
                //alert(JSON.stringify(err));
            }
        );
        
    }

    getDosageForms (prodId: number) {
        //alert('getdosageformcalled');
        let loading = this.loadingCtrl.create({
                                    content: 'Please wait...'
                            });
                            loading.present();
                            this.ps.getDosageForm(prodId).subscribe(
                                data => {
                                    if(data && data.length >0) {
                                       // alert(JSON.stringify(data));
                                       loading.dismiss();
                                        this.dosageForms = data;
                                       // this.getDosageDetails(prodId, data[0]['DosageForm']);
                                    }
                                },
                                err => {
                                    alert('getDosageForms error');
                                    loading.dismiss();
                                }
                            );
    }

    getDosageDetails(prodId: number, form: string) {
        let loading = this.loadingCtrl.create({
                                    content: 'Please wait...'
                            });
                            loading.present();
        this.ps.getDosageDetails(prodId, form).subscribe(
            data => {
                if(data && data.length > 0) {
                    this.dosageDetails = data;
                    loading.dismiss();
                }
            },
            err => {
                alert('getDosageDetails error');
                loading.dismiss();
            }
        );
    }

    private mode: number;
    ionViewDidLoad() {
        if(this.navParams.data) {
            this.mode = this.navParams.data.mode;

            if(this.mode === Constants.ADD) {
                this.item = new PrescriptionItem();
                //this.item.name = 'Name (Ex: Lipitor, Nexium etc)';
                this.buttonLabel = 'Add';
                this.isDeleteHidden = true;

            }else if(this.mode === Constants.EDIT) {
                this.item = this.navParams.data.item;
                //alert(JSON.stringify(this.item));
                this.getDosageForms(this.item.prodId);
                this.getDosageDetails(this.item.prodId, this.item.form);
                
                this.buttonLabel = 'Edit';
                this.isDeleteHidden = false;
            }
        }

    }

    onSubmit() {
        //alert(val.val);
        
        let message: string = '';
        if(this.item.prodName === '' || this.item.prodName === undefined) {
            message = 'Please a medication.';
        }else if(String(this.item.form).length === 0 || this.item.form === undefined) {
            message = 'Please select form of your medication.';
        }else if(String(this.item.strength).length === 0 || this.item.strength === undefined) {
            message = 'Please select strength of your medication';
        }else if(String(this.item.quantity).length === 0 || this.item.quantity === undefined) {
            message = 'Please enter quantity of your medication.';
        }

        if(message === '') {
            let obj = {mode: this.mode, item: this.item};
            this.viewCtrl.dismiss(obj);

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

    dismiss() {
        this.viewCtrl.dismiss();
    }

    remove(event, item) {
        let obj = {mode: Constants.DELETE, item: item};
        this.deleteAlert(item, obj);
        
    }

    deleteAlert(item, obj) {
        let confirm = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: `Delete ${item.name} and all of it's contents?`,
        buttons: [
            {
            text: 'No',
            handler: () => {
                //console.log('Disagree clicked');
            }
            },
            {
            text: 'Delete',
            handler: () => {
                //console.log('Agree clicked');
                this.viewCtrl.dismiss(obj);
                
            }
            }
        ]
        });
        confirm.present();
    }

}