import {Component, OnInit} from '@angular/core';
import * as momentImported from 'moment';

const moment = momentImported;

@Component({
  selector: 'ng2-picker-block',
  templateUrl: './picker-block.component.html',
  styleUrls: ['./picker-block.component.scss']
})
export class PickerBlockComponent implements OnInit {

  dayNames: Array<string> = [
    'Su',
    'Mo',
    'Tu',
    'Wd',
    'Th',
    'Fr',
    'St'
  ];

  startWeek = moment().startOf('month').week();
  endWeek = moment().endOf('month').week();

  currentMonth: string;

  calendar = [];

  constructor() {
  }

  ngOnInit() {
    this.currentMonth = moment().format('MMMM');

    for (let week = this.startWeek; week <= this.endWeek; week++) {
      this.calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
      });
    }

    console.log(this.calendar);
  }

}
