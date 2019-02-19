import {Component, OnInit} from '@angular/core';
import * as momentImported from 'moment';

const moment = momentImported;

export enum Stage {
  next = 'next',
  previous = 'previous'
}

export class Calendar {
  week: number;
  days: Array<momentImported.Moment>;
}

@Component({
  selector: 'ng2-picker-block',
  templateUrl: './picker-block.component.html',
  styleUrls: ['./picker-block.component.scss']
})
export class PickerBlockComponent implements OnInit {

  st = Stage;

  dayNames: Array<string> = [
    'Su',
    'Mo',
    'Tu',
    'Wd',
    'Th',
    'Fr',
    'St'
  ];

  pickerMonth: momentImported.Moment = moment();
  startWeek = moment(this.pickerMonth).startOf('month').week();
  // endWeek = moment(this.pickerMonth).endOf('month').week();
  endWeek = moment(this.pickerMonth).add(1, 'month').startOf('month').week();

  selectedDate: momentImported.Moment;

  calendar: Array<Calendar>;

  constructor() {
  }

  ngOnInit() {
    this.selectedDate = moment();

    this.setCalendar();
  }

  setCalendar(): void {
    this.calendar = [];
    for (let week = this.startWeek; week <= this.endWeek; week++) {
      this.calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => {
            return moment(this.pickerMonth).day(i).week(week);
          }
        )
      });
    }
  }

  changeMonth(stage: Stage): void {
    if (stage === this.st.previous) {
      this.pickerMonth = moment(this.pickerMonth).subtract(1, 'month');
      this.startWeek = this.pickerMonth.startOf('month').week();
      // this.endWeek = this.pickerMonth.endOf('month').week();
      this.endWeek = moment(this.pickerMonth).add(1, 'month').startOf('month').week();
      if (this.endWeek === 1) {
        this.endWeek = 53;
      }
    }
    if (stage === this.st.next) {
      this.pickerMonth = moment(this.pickerMonth).add(1, 'month');
      this.startWeek = this.pickerMonth.startOf('month').week();
      // this.endWeek = this.pickerMonth.endOf('month').week();
      this.endWeek = moment(this.pickerMonth).add(1, 'month').startOf('month').week();
      if (this.endWeek === 1) {
        this.endWeek = 53;
      }
    }
    this.setCalendar();
  }

  selectDate(day: momentImported.Moment): void {
    this.selectedDate = moment(day);

    if (moment(day).startOf('month').isBefore(moment(this.pickerMonth).startOf('month'))) {
      this.changeMonth(this.st.previous);
    }

    if (moment(day).startOf('month').isAfter(moment(this.pickerMonth).startOf('month'))) {
      this.changeMonth(this.st.next);
    }
  }

  getDayClass(day: momentImported.Moment): string {
    const dayClass: Array<string> = [];

    if (day.format('MMMM') === this.pickerMonth.format('MMMM')) {
      dayClass.push('current-month');
    } else {
      dayClass.push('not-current-month');
    }

    if (moment(day).startOf('day').isSame(this.selectedDate.startOf('day'))) {
      dayClass.push('selected');
    }
    return dayClass.join(' ');
  }


}
