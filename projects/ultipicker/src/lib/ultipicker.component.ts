import { Component, OnInit } from '@angular/core';
import * as momentImported from 'moment';

const moment = momentImported;

@Component({
  selector: 'ng2-ultipicker',
  template: `
    <ng2-picker-block (onselect)="log($event)" 
                      [minDate]="mindDate" 
                      [maxDate]="maxDate">
    </ng2-picker-block>
  `,
  styles: []
})
export class UltipickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get mindDate(): momentImported.Moment {
    return moment().subtract(2, 'month');
  }

  get maxDate(): momentImported.Moment {
    return moment().add(2, 'month');
  }

  log(event) {
    console.log(event);
  }

}
