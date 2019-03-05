import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as momentImported from 'moment';
import {unitOfTime} from 'moment';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import * as Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import {fromEvent, Subscription} from 'rxjs';

const moment = momentImported;

class Range {
  key: string;
  start: momentImported.Moment;
  end: momentImported.Moment;
}

class Memo {
  startDate: momentImported.Moment | null;
  endDate: momentImported.Moment | null;
}

@Component({
  selector: 'ng2-ultipicker-dual',
  templateUrl: './ultipicker-dual.component.html',
  styleUrls: ['./ultipicker-dual.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UltipickerDualComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class UltipickerDualComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  @ViewChild('startInput') startInput: ElementRef;
  @ViewChild('endInput') endInput: ElementRef;


  private _showCalendarWeeks = false;
  @Input('showCalendarWeeks')
  set showCalendarWeeks(bool: boolean) {
    this._showCalendarWeeks = bool;
  }

  get showCalendarWeeks(): boolean {
    return this._showCalendarWeeks;
  }

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

  @Input() minStartDate: momentImported.Moment = null;
  @Input() maxEndDate: momentImported.Moment = null;
  @Input() defaultStartDate: momentImported.Moment = moment();
  @Input() defaultEndDate: momentImported.Moment = moment();
   mode: unitOfTime.StartOf = 'day';
  @Input() inputDayFormat = 'MM-DD-YYYY';
   inputMonthFormat = 'MM-YYYY';
  @Input() separator = ' - ';

  @Input() dayNames;
  @Input() monthNames;

  private memoDate: Memo = {
    startDate: null,
    endDate: null
  };

  dayMask: string;
  private regexD;
  monthMask: string;

  pickerVisibility = false;

  @Input() ranges: Array<Range> = [
    {
      key: 'Today',
      start: moment(),
      end: moment()
    },
    {
      key: 'Yesterday',
      start: moment().subtract(1, 'days'),
      end: moment().subtract(1, 'days')
    },
    {
      key: 'This week',
      start: this.isoWeekConfig === 0 ? moment().startOf('week') : moment().startOf('isoWeek'),
      end: moment()
    },
    {
      key: 'This month',
      start: moment().startOf('month'),
      end: moment()
    },
    {
      key: 'This year',
      start: moment().startOf('year'),
      end: moment()
    },
    {
      key: 'Last week',
      start: this.isoWeekConfig === 0 ? moment().subtract(1, 'week').startOf('week') : moment().subtract(1, 'week').startOf('isoWeek'),
      end: this.isoWeekConfig === 0 ? moment().subtract(1, 'week').endOf('week') : moment().subtract(1, 'week').endOf('isoWeek')
    },
    {
      key: 'Last month',
      start: moment().subtract(1, 'month').startOf('month'),
      end: moment().subtract(1, 'month').endOf('month')
    },
    {
      key: 'Last year',
      start: moment().subtract(1, 'year').startOf('year'),
      end: moment().subtract(1, 'year').endOf('year')
    }
  ];

  componentForm: FormGroup;
  componentFormSub: Subscription;
  private propagateChange: (_: any) => {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.memoDate = {
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate
    };

    if (this.mode !== 'day') {
      this.monthMask = this.inputMonthFormat.replace(/\w/g, '9');
      this.regexD = new RegExp(this.monthMask.replace(/\W/g, '\\W').replace(/\d/g, '\\d'));
    } else {
      this.dayMask = this.inputDayFormat.replace(/\w/g, '9');
      this.regexD = new RegExp(this.dayMask.replace(/\W/g, '\\W').replace(/\d/g, '\\d'));
    }


    this.componentForm = this.fb.group({
      startDate: [this.defaultStartDate, [
        Validators.required
      ]],
      endDate: [this.defaultEndDate, [
        Validators.required
      ]],
    });

    this.componentFormSub = this.componentForm.valueChanges.subscribe(() => {
      this.fireChanges();
    });

    fromEvent(this.startInput.nativeElement, 'keyup').subscribe(() => {
      const val = this.startInput.nativeElement.value;
      if (this.regexD.test(this.startInput.nativeElement.value)) {

        const obj: Range = {
          key: 'keyup-start',
          start: moment(val, [this.mode === 'day' ? this.inputDayFormat : this.inputMonthFormat]),
          end: this.componentForm.get('endDate').value
        };

        this.setRange(obj);
      }
    });

    fromEvent(this.endInput.nativeElement, 'keyup').subscribe(() => {
      const val = this.endInput.nativeElement.value;
      if (this.regexD.test(this.endInput.nativeElement.value)) {

        const obj: Range = {
          key: 'keyup-end',
          start: this.componentForm.get('startDate').value,
          end: moment(val, [this.mode === 'day' ? this.inputDayFormat : this.inputMonthFormat])
        };

        this.setRange(obj);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.componentFormSub) {
      this.componentFormSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const startMask = new Inputmask({
        mask: this.mode === 'day' ? this.dayMask : this.monthMask,
        placeholder: '\u2000'
      });
      startMask.mask(this.startInput);

      const endMask = new Inputmask({
        mask: this.mode === 'day' ? this.dayMask : this.monthMask,
        placeholder: '\u2000'
      });
      endMask.mask(this.endInput);
    });
  }

  setStartDate(date: momentImported.Moment) {
    this.componentForm.get('startDate').setValue(date);
  }

  setEndDate(date: momentImported.Moment) {
    this.componentForm.get('endDate').setValue(date);
  }

  get currentStartDate(): momentImported.Moment {
    return moment(this.componentForm.get('startDate').value);
  }

  get currentEndDate(): momentImported.Moment {
    return moment(this.componentForm.get('endDate').value);
  }

  get formatStartDate(): string {
    return moment(this.componentForm.get('startDate').value).format(this.mode === 'day' ? this.inputDayFormat : this.inputMonthFormat);
  }

  get formatEndDate(): string {
    return moment(this.componentForm.get('endDate').value).format(this.mode === 'day' ? this.inputDayFormat : this.inputMonthFormat);
  }

  private getValue(val) {
    return this.componentForm.get(val).value;
  }

  setRange(range: Range) {

    let start: momentImported.Moment = range.start;
    let end: momentImported.Moment = range.end;

    if (start.startOf('day').isBefore(this.minStartDate.startOf('day'))) {
      start = this.minStartDate;
    }

    if (start.endOf('day').isAfter(this.getValue('endDate').endOf('day'))) {
      start = this.getValue('endDate').clone();
    }

    if (end.startOf('day').isBefore(this.getValue('startDate').startOf('day'))) {
      end = this.getValue('startDate').clone();
    }

    if (end.endOf('day').isAfter(this.maxEndDate.endOf('day'))) {
      end = this.maxEndDate;
    }

    this.componentForm.get('startDate').setValue(start);
    this.componentForm.get('endDate').setValue(end);
  }

  get mainInput() {
    return `${this.formatStartDate}${this.separator}${this.formatEndDate}`;
  }

  togglePicker(): void {
    this.pickerVisibility ? this.closePicker() : this.openPicker();
  }

  openPicker(): void {
    this.pickerVisibility = true;
  }

  closePicker(): void {
    this.pickerVisibility = false;
  }

  private fireChanges() {
    if (this.propagateChange) {
      this.propagateChange(this.componentForm.value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }



}
