import { Constants } from './../../utils/constants';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'time-range',
  templateUrl: 'time-range.html'
})
export class TimeRange {
    @Input() days: string;
    @Input() value: any;
   // @Output() onChange = new EventEmitter();

    private mfRange: any;
    private mfRangeT: any;
    
    constructor(){}
    ngOnInit() {
        this.mfRange = this.value;//{ lower: 9, upper: 18 };
        //alert(JSON.stringify(this.mfRange));
        let lowerObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.lower);
        let upperObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.upper);
        this.mfRangeT = { lower: lowerObj, upper: upperObj };

    }

    onRangeChange(event) {
        //this.onChange.emit(event);
        this.mfRange = { lower: event.value.lower, upper: event.value.upper };
        let lowerObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.lower);
        let upperObj: any = Constants.TIME.find(timeObj => timeObj.val === this.mfRange.upper);
        this.mfRangeT = { lower: lowerObj, upper: upperObj };
    }

    private timeVal: any;

   
}