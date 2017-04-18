import { HomePage } from './../../pages/home/home';
import { NavParams, NavController } from 'ionic-angular';
import { Colors } from './../../utils/colors';
import { Component } from '@angular/core';

@Component({
  selector: 'page-message',
  templateUrl: 'message-page.html'
})

export class MessagePage {
    private headerColor: string = Colors.BLUE;
    private name: string;
    constructor(public navCtrl: NavController, 
                public navParams: NavParams) {}
    
    ionViewDidEnter() {
        this.name = this.navParams.get('params').name;
        //alert(JSON.stringify(this.navParams.get('params')));
    }

    goHome() {
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'back'});
    }
}