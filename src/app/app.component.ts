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

  dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  monthNames = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

  get minDate(): momentImported.Moment {
    return moment().subtract(1, 'year');
  }

  get maxDate(): momentImported.Moment {
    return moment().add(1, 'year');
  }

  get defaultStartDate(): momentImported.Moment {
    return moment();
  }

  get defaultEndDate(): momentImported.Moment {
    return moment().add(7, 'day');
  }

}
