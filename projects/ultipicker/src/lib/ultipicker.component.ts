import {Component, OnInit} from '@angular/core';
import * as momentImported from 'moment';

const moment = momentImported;

@Component({
  selector: 'ng2-ultipicker',
  templateUrl: './ultipicker.component.html',
  styleUrls: ['./ultipicker.component.scss']
})
export class UltipickerComponent implements OnInit {

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

  setDate(event) {
    console.log(event);
  }

  constructor() {}

  ngOnInit() {}
}
