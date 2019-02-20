import { Component } from '@angular/core';

import * as momentImported from 'moment';

const moment = momentImported;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ulti-picker';

  get minDate(): momentImported.Moment {
    return moment().subtract(1, 'month');
  }

  get maxDate(): momentImported.Moment {
    return moment().add(1, 'month');
  }

  get defaultStartDate(): momentImported.Moment {
    return moment();
  }

  get defaultEndDate(): momentImported.Moment {
    return moment().add(7, 'day');
  }

}
