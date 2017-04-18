import { MessagePage } from './../../components/message-page/message-page';
//import { HomePage } from './../home/home';
import { Constants } from './../../utils/constants';
import { ConfirmUserDetailsService } from './../../providers/confirmuserdetails-service';
import { AppService } from './../../services/app-service';
import { CustomerProfileService } from './../../providers/customer-profile-service';
import { Colors } from './../../utils/colors';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Transfer, File } from 'ionic-native';
//import { Headers } from '@angular/http';
/*
  Generated class for the Confirmuserdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;

@Component({
  selector: 'page-confirmuserdetails',
  templateUrl: 'confirmuserdetails.html',
  providers: [CustomerProfileService, ConfirmUserDetailsService]
})
export class ConfirmuserdetailsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public custProfileServ: CustomerProfileService,
              public loadingCtrl: LoadingController,
              public appServ: AppService,
              public confUserDetsServ:ConfirmUserDetailsService) {}

  public headerColor: string = Colors.BLUE;
  private addresses: any = [];
  private insurances: any = [];
  private children: any = [];
  private selectedAddress: any;
  private selectedInsurance: any;
  private selectedChild: any;
  private params: any;
  //private selectedPharmaName: string;
  private pharma: any;
  private pharmacyEmail: string;
  private pharmacyPhone: number;

  ionViewDidEnter() {
    this.params = this.navParams.get('params');
    //alert(JSON.stringify(this.params));
    /*{"pharmacies":
        [{"PharmacyID":"1","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"},
        {"PharmacyID":"2","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"},
        {"PharmacyID":"3","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"},
        {"PharmacyID":"1","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"}],
      
      "images":[],
      "precriptionItems":[
        {"prodName":"Abacavir","prodId":"9","form":"SOLUTION","strength":"20mg/mL","quantity":"56","noOfRefills":"2"}],
      "selectedPharma":
        {"PharmacyID":"1","PharmacyName":"Pharmacy","DeliverStatus":"1","OpenHours":"8am - 10pm"}
    }*/
    this.pharma = this.params.selectedPharma;

    let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
    this.custProfileServ.getCustomerAddresses().subscribe(
      data => {
        //loading.dismiss();
        if(data && data.length > 0) {
          //loading.dismiss();
          this.addresses = data;
          this.selectedAddress = data[0];
          
        }
      },
      err => {
        //loading.dismiss();
        alert('Error fetching addresses.');
      }
    );

    //loading.present();
    this.custProfileServ.getCustomerInsurances().subscribe(
      data => {
        loading.dismiss();
        if(data && data.length > 0) {
          //loading.dismiss();
          this.insurances = data;
          this.selectedInsurance = data[0];
          
        }
      },
      err => {
        loading.dismiss();
        alert('Error fetching addresses.');
      }
    );
    /*if(this.navParams.data) {
      let params: any = this.navParams.get('params');
      //alert(JSON.stringify(params));
    }*/
    //console.log('ionViewDidLoad ConfirmuserdetailsPage');
  }

  private isChild;
  onRequestPrice() {
    //alert(this.isChild);
    this.checkCase();
    //this.upload();
    //this.insertPrescriptionItems();
  }


  checkCase() {
    this.images = this.params.images;
    this.items = this.params.precriptionItems;
    if(this.images.length > 0 && this.items.length > 0) {
      this.isImageOnly = 0;
      this.upload();
      
    }else if(this.images.length > 0) {
      this.isImageOnly = 1;
      this.upload();
      
    }else if(this.items.length > 0) {
      this.isImageOnly = 0;
      this.insertPrescriptionHeader();
    }
  }
  insertPrescriptionHeader() {
    let item: any = {};
    item['pharmacyId'] = this.params.selectedPharma['PharmacyID'];
    item['insuranceId'] = this.selectedInsurance.CustomerInsuranceID;
    item['addressId'] = this.selectedAddress['AddressID'];
    item['imagePaths'] = this.imagePaths.toString();
    item['status'] = 0;
    item['isImageOnly'] = this.isImageOnly;
    if(this.selectedChild) {
      item['relationId'] = this.selectedChild['RelationID'];
    }else {
      item['relationId'] = 0;
    }
    
    //alert(JSON.stringify(item));
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    //alert(JSON.stringify(item));
    this.confUserDetsServ.insertPrescriptionImageHeader(item).subscribe(
        data => {
          if(data && data.length > 0) {
            this.pharmacyEmail = data[0]['PharmacyEmail'];
            this.pharmacyPhone = data[0]['PharmacyPhone'];
            if(this.isImageOnly === 0) {
              this.insertPrescriptionItems(data[0]['HeaderID']);
            }else if(this.isImageOnly === 1) {
              this.sendEmailToPharmacy();
            }
          }
          
          //alert(JSON.stringify(data));
          loading.dismiss();
        },
        err => {
          alert(JSON.stringify(err));
          loading.dismiss();
        }
      );
  
  }

  sendEmailToPharmacy() {
    let item: any = {
      pharmacyEmail: this.pharmacyEmail,
      pharmacyPhone: this.pharmacyPhone,
    };
    this.confUserDetsServ.sendEmail(item).subscribe(
      data => {
        //alert(JSON.stringify(data));
        let params: any = {name: this.pharma.PharmacyName};
        this.navCtrl.setRoot(MessagePage, {params}, {animate: true, direction: 'forward'});
      },
      err => {
        alert(JSON.stringify(err));
      }
    );
  }

  insertPrescriptionItems(pHeaderId : number) {
    //this.items = this.params.precriptionItems;
    for(let item of this.items) {
    //for(let i: number = 0; i < this.items.length; i++) {
      //
      item['pHeaderId'] = pHeaderId;
      this.confUserDetsServ.insertPrescriptionItem(item).subscribe(
        data => {
          this.itemCounter++;
          if(this.itemCounter === this.items.length) {
            this.sendEmailToPharmacy();

            
          }
          //alert(JSON.stringify(data));
        },
        err => {
          alert(JSON.stringify(err));
        }
      );
    }
  }

  private itemCounter: number = 0;
  private imageCounter: number = 0;
  //private prg: number = 0;
  private images = [];
  private isImageOnly: number;
  private items = [];
 // private img: string;
  upload() {
    for(let img of this.images) {
       this.uploadPrescription(img['location'], img['fileName']);
    }
    /*if(this.images.length > 0) {
      for(let img of this.images) {
        this.uploadPrescription(img['location'], img['fileName']);
      }
      return;
    }

    if(this.items.length > 0) {
      this.insertPrescriptionItems();
    }*/
    
    
    /*for(let i: number = 0; i < this.images.length; i++) {
      this.uploadPrescription(this.images[i].location, this.images[i].fileName)
    }*/
  }

  private imagePaths = [];
  uploadPrescription(filePath: string, fileName: string) {
      // Destination URL
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

    loading.present();
    let url = Constants.SERVICES[this.appServ.env]['upload'];
    let targetPath = filePath + fileName;//cordova.file.dataDirectory + img;
    let filename = fileName;//this.lastImage;
    //let headers = new Headers();
    //headers.append('Userid', this.appServ.loginUserDetails['UserID']);
    //headers.append('Type', this.appServ.loginUserDetails['Type']);
    
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
        'fileName': filename, 
        'Userid': this.appServ.loginUserDetails['UserID']
      }
    };
    //alert(JSON.stringify(options));
    const fileTransfer = new Transfer();
  
    
  
    //fileTransfer.onProgress(this.prog);
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      //this.loading.dismissAll()
      //alert('Image succesful uploaded.');
      //alert(JSON.stringify(data));
      this.imagePaths.push(data['response']);// +=  + ', ';
      loading.dismiss();
      File.removeFile(filePath, fileName)
        .then((data)=>{
          //alert(JSON.stringify(data));
          //this.imgSrc = '';
          //this.imagePaths += data['response'];
        },
        (err) => {
          alert(JSON.stringify(err));
        }
        
        );
        this.imageCounter++;
        
        if(this.imageCounter === this.images.length) {
          this.insertPrescriptionHeader();
          //this.imageCounter = 0;
          //alert(this.imagePaths.toString());
        }
    }, err => {
      //this.loading.dismissAll()
      loading.dismiss();
      alert('Error while uploading file.');
    });
  }

  /*prog =  (progressEvent: ProgressEvent) : ßvoid => {
        this.ngZone.run(() => {
            if (progressEvent.lengthComputable) {
                //let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                let progress = (progressEvent.loaded / progressEvent.total) * 100;
                //console.log(progress);
                this.prg = progress;      
            }
        });
    }*/

  onIsChildChecked() {
    //alert(this.isChild);
    if(this.isChild) {
      let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
      this.custProfileServ.getChildren().subscribe(
        data => {
          loading.dismiss();
          if(data && data.length > 0) {
              this.children = data;
              this.selectedChild = data[0];
          }
        },
        err => {
          loading.dismiss();
          alert('Error fetching children.');
        }
      );
    }
  }
}
