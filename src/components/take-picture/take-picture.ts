import { PharmaciesListService } from './../../providers/pharmacies-list-service';
import { ZoomImage } from './../zoom-image/zoom-image';
import { PharmacieslistPage } from './../../pages/pharmacieslist/pharmacieslist';
import { PrescriptionItem } from './../../vo/prescription-item';
import { PrescriptionEntry } from './../prescription-entry/prescription-entry';
import { Constants } from './../../utils/constants';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, 
    ModalController, AlertController, ActionSheetController,
    Platform, LoadingController, ToastController } from 'ionic-angular';
import { Camera, FilePath, File } from 'ionic-native';
import { PhotoViewer } from '@ionic-native/photo-viewer';

declare var cordova: any;

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
  providers: [PharmaciesListService, PhotoViewer]
})
export class TakePicture {
    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public modalCtrl:ModalController,
                public alertCtrl: AlertController,
                public pls: PharmaciesListService,
                public actionSheetCtrl: ActionSheetController,
                public platform: Platform,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                private photoViewer: PhotoViewer  ){}
    
    pics = [];
    ionViewDidLoad() {
        //this.addedItems = [];
        //this.addedItems = new Array<PrescriptionItem>();
    }

    public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [{
          text: 'Load from Gallery',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
           // this.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        },
        {
          text: 'Use Camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType: number) {
  // Create options for the Camera Dialog
  let options = {
    quality: 50,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
      .then(filePath => {
          let imageFilePath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let imageFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(imageFilePath, imageFileName, this.createFileName());
      });
    } else {
      let imageFileName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      let imageFilePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(imageFilePath, imageFileName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

// Copy the image to a local folder
private copyFileToLocalDir(currentPath, currentName, newFileName) { 
  File.moveFile(currentPath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    //this.lastImage = newFileName;
    this.picId++;
    let newPic = {picId: this.picId, location: cordova.file.dataDirectory, fileName: newFileName};
    this.pics.push(newPic);

    /*File.removeFile(currentPath, currentName)
    .then((data)=>{
        //alert();
      //alert(JSON.stringify(data));
      //this.imgSrc = '';
    },
    (err) => {
      alert(JSON.stringify(err));
    }
    
    );*/
    
  }, error => {
    this.presentToast('Error while moving file.');
  });
}


    /*takePicture(camType: number) {
        //Camera.getPicture(successCallback, errorCallback, options);
        //let camType: number;
        
        let options = {
            destinationType: Camera.DestinationType.FILE_URI, 
            sourceType: camType 
        };
        //Camera.getPicture(options).then(this.success, this.failed);
        Camera.getPicture(options).then((imgData) => {
            alert(JSON.stringify(imgData));
            //this.imgSrc = imgData;
            this.picId++;
            let newPic = {picId: this.picId, location: imgData};
            // alert(JSON.stringify(newPic));
            this.pics.push(newPic);
            //this.imgSrc = "data:image/jpeg;base64," +imgData;
            //this.convertToBase64(imgData);
            //this.picId++;
            //let newPic = {picId: this.picId, location: this.imgSrc};
            //this.pics.push(newPic);

        }, (err) => {
            alert(JSON.stringify(err));
        });
    }*/

    picId: number = 0;
    success(img) {
        this.picId++;
       // alert(JSON.stringify(img));
       //this.location = img;
        let newPic = {picId: this.picId, location: img};
       // alert(JSON.stringify(newPic));
        this.pics.push(newPic);
    }

    failed(err) {
        alert(JSON.stringify(err));
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    okClick() {
        this.viewCtrl.dismiss();
    }

    addPrescription() {
        let prescModal = this.modalCtrl.create(PrescriptionEntry, {mode: Constants.ADD});
        //prescModal.onDidDismiss(this.onAdd);
        prescModal.onDidDismiss((data) => {
            //alert(JSON.stringify(data));
            if(data && data.hasOwnProperty('mode') && data.mode === Constants.ADD) {
                this.addedItems.push(data.item);
            }
        });
        prescModal.present();
    }

    removeImage(pic) {
        //alert(JSON.stringify(pic));
        let index = this.pics.findIndex(x => x.picId === pic.picId);
        //let currentPic = this.pics[index];
        this.pics.splice(index, 1);
        
        File.removeFile(pic.location, pic.fileName)
        .then((data)=>{
            //alert();
        //alert(JSON.stringify(data));
        //this.imgSrc = '';
        },
        (err) => {
            alert(JSON.stringify(err));
        }
        
        );
    }
    
    addedItems = [];

    onItemSelect(item) {
        let obj = {mode: Constants.EDIT, item};
        let prescModal = this.modalCtrl.create(PrescriptionEntry, obj);
        prescModal.onDidDismiss((data) => {
            //alert(JSON.stringify(data));
            if(data && data.hasOwnProperty('mode') && data.mode === Constants.DELETE) {
                let index = this.addedItems.findIndex(x => x.name === item.name);
                this.addedItems.splice(index, 1);
            }
        });
        prescModal.present();
    }

    zoomImage(pic) {
        //alert(pic.location);
        //let zoomPicModal = this.modalCtrl.create(ZoomImage, pic);
        //zoomPicModal.present();
        //PhotoViewer.show(pic.location, 'Prescription Image', {share: false});
        this.photoViewer.show(pic.location + pic.fileName, 'Prescription Image', {share: false});
    }

    removeItem(event, item) {
        event.stopPropagation();
        this.deleteAlert(item);
        
    }

    deleteAlert(item) {
        //alert(JSON.stringify(item));
        let confirm = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: `Delete ${item.prodName} and all of it's contents?`,
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
                let index = this.addedItems.findIndex(x => x.prodId === item.prodId);
                this.addedItems.splice(index, 1);
            }
            }
        ]
        });
        confirm.present();
    }

    findAPharma() {
        if((this.pics && this.pics.length > 0) || (this.addedItems && this.addedItems.length > 0)) {
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });

            loading.present();
            this.pls.getPharmacies().subscribe(data => {
            if(data && data.length > 0) {
                loading.dismiss();
                //this.navCtrl.push(PharmacieslistPage);
                //this.appServ.loginUserDetails = data[0];
                //alert(JSON.stringify(data));
                let params: any = {};
                params.pharmacies = data;
                params.images = this.pics;
                params.precriptionItems = this.addedItems;
                this.navCtrl.push(PharmacieslistPage,{params: params}, 
                    {animate: true, direction: 'forward'});
                /*if(data[0]['type'] === 'p') {
                    this.appServ.customerType = Constants.PHARMACY;
                
                }else {
                    this.appServ.customerType = Constants.CUSTOMER;
                }*/
                }
            
            },
            err => {
                loading.dismiss();
                alert('getPharmacies Error');
            });
        }else {
            this.presentToast('Enter prescription or take a prescription image.');
        }
        //this.navCtrl.push(PharmacieslistPage);
        //let pharmaciesModal = this.modalCtrl.create(PharmacieslistPage);
        //pharmaciesModal.present();
    }
    
    /*test() {
        this.pls.insertImages().subscribe(
            data => {
                alert(JSON.stringify(data));
            },
            error => {
                alert(JSON.stringify(error));
            }
        );
    }*/
}