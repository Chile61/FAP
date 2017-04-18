import { AppService } from './../../services/app-service';
import { Search } from './../search/search';
//import { InsurancesListPage } from './../insurances-list/insurances-list';
import {
  CustomerProfileService
} from './../../providers/customer-profile-service';
import {
  Constants
} from './../../utils/constants';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController,
  ActionSheetController,
  Platform,
  ModalController
}
from 'ionic-angular';
import {
  Component
} from '@angular/core';
import {
  Camera,
  File,
  Transfer,
  FilePath
} from 'ionic-native';

import { PhotoViewer } from '@ionic-native/photo-viewer';

declare let cordova: any;

@Component({
  selector: 'add-insurance',
  templateUrl: 'add-insurance.html',
  providers:[CustomerProfileService, PhotoViewer]
})

export class AddInsurance {

  private mode: number;
  private addEditLabel: string;
  //private compName: string;
  private insuranceNumber: string;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public custProfileServ: CustomerProfileService,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public appServ: AppService,
    public modalCtrl: ModalController,
    private photoViewer: PhotoViewer) {

  }

  ionViewDidLoad() {
    this.mode = this.navParams.get('mode');
    //alert(this.mode);
    let ins = this.navParams.get('ins');
    if (this.mode === Constants.ADD) {
      this.addEditLabel = 'Add';
    } else if (this.mode === Constants.EDIT) {
      //alert(JSON.stringify(ins));
      this.addEditLabel = 'Edit';
      this.selectedCompany = {};
      this.selectedCompany.ID = ins.Insurance_CO_ID;
      this.selectedCompany.NAME = ins.INSURANCE_CO_NAME;
      this.insuranceNumber = ins.InsuranceNo;
      this.front = {};
      this.front = this.getServerImageLocation(ins.Insurance_Front_Image);
      this.back = {};
      this.back = this.getServerImageLocation(ins.Insurance_Back_Image);
      //alert(JSON.stringify(this.front));
      //alert(JSON.stringify(this.back));
    }
  }

  getServerImageLocation(path: string): any {
      let locArr: string[] = path.split('/');
      let fileName: string = String(locArr[locArr.length - 1]);
      locArr.pop();
      let location: string = Constants.SERVICES[this.appServ.env]['root'] + locArr.join('/');
      return {location, fileName};
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selectedCompany: any;

  public showInsurances() {
    
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();

    this.custProfileServ.getInsurances().subscribe(
        data => {
            loading.dismiss();
            if(data && data.length > 0) {
                    let nameModal = this.modalCtrl.create(Search, 
                    {rawItems: data, labelField: 'NAME',
                title: 'Select insurance'});
                    nameModal.onDidDismiss(data => {
                        if(data) {
                            this.selectedCompany = data;
                            //alert(JSON.stringify(data));
                        }
                    })
                    nameModal.present();
                }
        },
        error => {
            loading.dismiss();
            alert('Error getting insurance list.');
        }
    );
    /*let modal = this.modalCtrl.create(InsurancesListPage);
    modal.onDidDismiss((data) => {
      if(data) {
        this.selectedCompany = data;
      }
    });
    modal.present();*/
  }

  public presentActionSheet(isFront) {
    this.isFront = isFront;
    //alert(isFront);
    //this.removeImage(isFront ? 'front' : 'back', isFront ? this.front : this.back);
    //this.removeImage('front', this.front);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [{
          text: 'Load from Gallery',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
            //this.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
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
    //alert(JSON.stringify(imagePath));
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
      //alert(String(this.insuranceNumber));
      this.copyFileToLocalDir(imageFilePath, imageFileName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

  private isFront: boolean;
  public createFileName() {
    /*var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;*/
    let newFileName = this.isFront ? "Front" : "Back";
    newFileName = newFileName + "_" + String(this.insuranceNumber) + ".jpg";
    //alert(newFileName);
    return newFileName;
  }

  // Copy the image to a local folder
  front: any;
  back: any;
private copyFileToLocalDir(currentPath, currentName, newFileName) { 
  //alert('before move');
  File.moveFile(currentPath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    //this.lastImage = newFileName;
    //this.picId++;
    //alert('move success : '+ cordova.file.dataDirectory);
    //server path
    let path = "api/uploads/"+ Constants.APP_VERSION + "/" + this.appServ.loginUserDetails['UserID'] + "/";
    if(this.isFront) {
      this.front = { location: cordova.file.dataDirectory, fileName: newFileName, uploadPath: path + newFileName };
    }else {
      this.back = { location: cordova.file.dataDirectory, fileName: newFileName, uploadPath: path + newFileName  };
    }
    
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  addEdit() {
    let message: string = '';
    if (this.selectedCompany.NAME === '' || this.selectedCompany.NAME === undefined) {
      message = 'Please enter insurance company name.';
    } else if (this.insuranceNumber === '' || this.insuranceNumber === undefined) {
      message = 'Please enter your policy number.';
    } else if(this.front === undefined || this.front == null) {
      message = 'Please select front image of your insurance.';
    }else if(this.back === undefined || this.back == null) {
      message = 'Please select back image of your insurance.';
    }

    if (message === '') {
      //this.save();
      this.saveImages();

    } else {
      let toast = this.toastCtrl.create({
        message,
        duration: 3000,
        position: 'bottom',
        cssClass: 'toast-fail'
      });
      toast.present();
    }
  }

  saveImages() {
    //this.save();
    let pics = [];
      pics.push(this.front);
      pics.push(this.back);
      for(let img of pics) {
        this.uploadInsurance(img['location'], img['fileName']);
      }
  }

  private imageCounter: number = 0;
  uploadInsurance(filePath: string, fileName: string) {
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
      //alert('File uploaded ' + JSON.stringify(data));
      //this.imagePaths.push(data['response']);// +=  + ', ';
      loading.dismiss();
      File.removeFile(filePath, fileName)
        .then((data)=>{
          this.imageCounter++;
          if(this.imageCounter === 2) {
            //alert(this.front.uploadPath);
            //alert(this.back.uploadPath);
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            this.custProfileServ.insertUpdateCustomerInsurance(0,this.insuranceNumber,'',this.selectedCompany.ID,this.front.uploadPath,this.back.uploadPath)
            .subscribe(
              data => {
                //alert(JSON.stringify(data));
                loading.dismiss();
                if (data && data.length > 0 && data[0]['RESULT'] === '1') {
                  this.viewCtrl.dismiss({
                    insuranceId: data[0]['InsuranceID'],
                    compName: this.selectedCompany.NAME,
                    insuranceNumber: this.insuranceNumber
                  });
                }
              },
              err => {
                alert(JSON.stringify(err));
                loading.dismiss();
              }
            );
          }
          //alert('sucess');
          //alert('FIle removed: ' + JSON.stringify(data));
          //this.imgSrc = '';
          //this.imagePaths += data['response'];
        },
        (err) => {
          alert(JSON.stringify(err));
        }
        
        );
        //this.imageCounter++;
        
        //if(this.imageCounter === this.images.length) {
          //this.insertPrescriptionHeader();
          //this.imageCounter = 0;
          //alert(this.imagePaths.toString());
        //}
    }, err => {
      //this.loading.dismissAll()
      loading.dismiss();
      alert('Error while uploading file.');
    });
  }

  save() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.custProfileServ.insertUpdateCustomerInsurance(0, this.insuranceNumber, this.selectedCompany.NAME, this.selectedCompany.ID,'','')
      .subscribe(
        (data) => {
          loading.dismiss();
          if (data && data.length > 0 && data[0]['RESULT'] === '1') {
            this.viewCtrl.dismiss({
              insuranceId: data[0]['InsuranceID'],
              compName: this.selectedCompany.NAME,
              insuranceNumber: this.insuranceNumber
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

  removeImage(type, pic) {
        if(type === 'front') {
          this.front = null;
        }else {
          this.back = null;
        }
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

    zoomImage(pic) {
      //alert(pic.location + '/' + pic.fileName);
       this.photoViewer.show(pic.location + '/' + pic.fileName, 'Prescription Image', {share: false});
    }
    
    
}
