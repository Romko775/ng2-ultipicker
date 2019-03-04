import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as momentImported from 'moment';

const moment = momentImported;

export enum Stage {
  next = 'next',
  previous = 'previous',
  current = 'current'
}

export class Calendar {
  week: number;
  days: Array<momentImported.Moment>;
}

@Component({
  selector: 'ng2-picker-block',
  templateUrl: './picker-block.component.html',
  styleUrls: ['./picker-block.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickerBlockComponent implements OnInit {

  private _isoWeekConfig = 0;
  @Input('isoWeekConfig')
  set isoWeekConfig(val: number) {
    if (val === 0 || val === 1) {
      this._isoWeekConfig = val;
    } else {
      this._isoWeekConfig = 0;
    }
  }

  get isoWeekConfig(): number {
    return this._isoWeekConfig;
  }

  // private values for get & set hooks
  private _selectedDate: momentImported.Moment;
  private _pickerMonth: momentImported.Moment = moment();
  private _minDate: momentImported.Moment = null;
  private _maxDate: momentImported.Moment = null;
  private _leftArrowDisabled = false;
  private _rightArrowDisabled = false;

  oldDate: momentImported.Moment = moment();

  @Input('minDate')
  set minDate(date: momentImported.Moment) {
    this._minDate = date;
    this.setUpArrows();
  }

  get minDate(): momentImported.Moment {
    return this._minDate;
  }

  @Input('maxDate')
  set maxDate(date: momentImported.Moment) {
    this._maxDate = date;
    this.setUpArrows();
  }

  get maxDate(): momentImported.Moment {
    return this._maxDate;
  }

  @Input('defaultDate')
  set selectedDate(date: momentImported.Moment) {
    if (date !== null || date !== undefined) {
      this._selectedDate = date;
    } else {
      this._selectedDate = moment();
    }

    this.setUpDates();
  }

  get selectedDate(): momentImported.Moment {
    return this._selectedDate;
  }

  set pickerMonth(date: momentImported.Moment) {
    this._pickerMonth = date;
  }

  get pickerMonth(): momentImported.Moment {
    return this._pickerMonth;
  }

  get leftArrowDisabled(): boolean {
    return this._leftArrowDisabled;
  }

  set leftArrowDisabled(bool: boolean) {
    this._leftArrowDisabled = bool;
  }

  get rightArrowDisabled(): boolean {
    return this._rightArrowDisabled;
  }

  set rightArrowDisabled(bool: boolean) {
    this._rightArrowDisabled = bool;
  }


  @Input() setDisable = false;

  private _dayNames: Array<string>;
  @Input('dayNames')
  set dayNames(namesArr: Array<string>) {
    if (namesArr !== null && namesArr !== undefined && namesArr.length === 7) {
      this._dayNames = namesArr;
    } else {
      this._dayNames = ['Su', 'Mo', 'Tu', 'Wd', 'Th', 'Fr', 'St'];
    }
  }

  get dayNames(): Array<string> {
    return this._dayNames;
  }


  private _monthNames: Array<string>;
  @Input('monthNames')
  set monthNames(val: Array<string>) {
    if (val && val.length > 0) {
      this._monthNames = val;
    } else {
      this._monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    }
  }

  get monthNames(): Array<string> {
    return this._monthNames;
  }

  @Output() onselect: EventEmitter<momentImported.Moment> = new EventEmitter<momentImported.Moment>();

  st = Stage;

  startWeek = this.isoWeekConfig === 0 ?
    moment(this.pickerMonth).startOf('month').week() : moment(this.pickerMonth).startOf('month').isoWeek();
  endWeek = this.isoWeekConfig === 0 ?
    moment(this.pickerMonth).add(1, 'month').startOf('month').week() : moment(this.pickerMonth).add(1, 'month').startOf('month').isoWeek();


  calendar: Array<Calendar>;

  constructor() {
  }

  ngOnInit() {

    if (this.isoWeekConfig === 1) {
      this._dayNames.push(this._dayNames.shift());
    }

    this.setCalendar();
  }

  setUpDates(): void {
    if (!this.oldDate.isSame(this.selectedDate)) {
      this.oldDate = this.selectedDate;
      this.pickerMonth = this.selectedDate;
      this.changeMonth(this.st.current);
    }
  }

  setUpArrows() {
    this.minDate ?
      this.leftArrowDisabled = this.pickerMonth.month() === this.minDate.month() && this.pickerMonth.year() === this.minDate.year()
      : this.leftArrowDisabled = false;
    this.maxDate ?
      this.rightArrowDisabled = this.pickerMonth.month() === this.maxDate.month() && this.pickerMonth.year() === this.maxDate.year()
      : this.rightArrowDisabled = false;
  }

  setCalendar(): void {
    this.calendar = [];

    for (let week = this.startWeek; week <= this.endWeek; week++) {

      const daysOfWeek = [];

      for (let i = this.isoWeekConfig; i < 7 + this.isoWeekConfig; i++) {
        if (this.isoWeekConfig === 1) {
          daysOfWeek.push(moment(this.pickerMonth).isoWeek(week).day(i));
        } else {
          daysOfWeek.push(moment(this.pickerMonth).week(week).day(i));
        }
      }

      this.calendar.push({
        week: week,
        days: daysOfWeek
      });
    }
  }

  changeMonth(stage: Stage): void {
    if (stage === this.st.previous) {
      this.pickerMonth = moment(this.pickerMonth).subtract(1, 'month');
    }
    if (stage === this.st.next) {
      this.pickerMonth = moment(this.pickerMonth).add(1, 'month');
    }
    if (stage === this.st.current) {
      this.pickerMonth = moment(this.pickerMonth).startOf('day');
    }

    this.emitChanges();

    this.navigateMonth(this.pickerMonth);
  }

  navigateMonth(date: momentImported.Moment) {
    this.startWeek = this.isoWeekConfig === 0 ? moment(date).startOf('month').week() : moment(date).startOf('month').isoWeek();
    this.endWeek = this.isoWeekConfig === 0 ?
      moment(date).add(1, 'month').startOf('month').week() : moment(date).add(1, 'month').startOf('month').isoWeek();
    if (this.endWeek === 1) {
      this.endWeek = 53;
    }

    this.setUpArrows();
    this.setCalendar();
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

  checkDateRange(day): boolean {
    return !(
      moment(day).startOf('day').isBetween(
        moment(this.minDate).subtract(1, 'day').endOf('day'),
        moment(this.maxDate).endOf('day')
      )
    );
  }

  selectDate(day: momentImported.Moment): void {
    this.selectedDate = moment(day);

    if (moment(day).startOf('month').isBefore(moment(this.pickerMonth).startOf('month'))) {
      this.changeMonth(this.st.previous);
    }

    if (moment(day).startOf('month').isAfter(moment(this.pickerMonth).startOf('month'))) {
      this.changeMonth(this.st.next);
    }

    this.emitChanges();
  }

  private emitChanges() {
    this.onselect.emit(this.selectedDate);
  }

}
