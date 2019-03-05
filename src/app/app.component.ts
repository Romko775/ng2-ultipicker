import {Component} from '@angular/core';

import * as momentImported from 'moment';

const moment = momentImported;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  minDate = moment().subtract(10, 'year');
  maxDate = moment().add(10, 'year');
  defaultStartDate = moment();
  defaultEndDate = moment().add(7, 'day');
}
