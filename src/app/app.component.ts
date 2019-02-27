import {Component} from '@angular/core';

import * as momentImported from 'moment';

const moment = momentImported;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  minDate = moment().subtract(2, 'month');
  maxDate = moment().add(2, 'month');
  defaultStartDate = moment();
  defaultEndDate = moment().add(7, 'day');
}
