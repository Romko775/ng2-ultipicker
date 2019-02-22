import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as momentImported from 'moment';
import {unitOfTime} from 'moment';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import * as Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';

// export const DATE_MASK = '99/99/9999';
// export const MONTH_MASK = '99/9999';

const moment = momentImported;

export class Range {
  key: string;
  start: momentImported.Moment;
  end: momentImported.Moment;
}

@Component({
  selector: 'ng2-ultipicker',
  templateUrl: './ultipicker.component.html',
  styleUrls: ['./ultipicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UltipickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class UltipickerComponent implements OnInit, AfterViewInit {

  @ViewChild('startInput') startInput: ElementRef;
  @ViewChild('endInput') endInput: ElementRef;

  @Input() minStartDate: momentImported.Moment = null;
  @Input() maxEndDate: momentImported.Moment = null;
  @Input() defaultStartDate: momentImported.Moment = moment();
  @Input() defaultEndDate: momentImported.Moment = moment();
  @Input() mode: unitOfTime.StartOf = 'day';
  @Input() inputDayFormat = 'MM-DD-YYYY';
  @Input() inputMonthFormat = 'MM-YYYY';

  dayMask: string;
  monthMask: string;

  ranges: Array<Range> = [
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
      start: moment().startOf('week'),
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
      start: moment().subtract(1, 'week').startOf('week'),
      end: moment().subtract(1, 'week').endOf('week')
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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.dayMask = this.inputDayFormat.replace(/\w/g, '9');
    this.monthMask = this.inputMonthFormat.replace(/\w/g, '9');

    this.componentForm = this.fb.group({
      startDate: [this.defaultStartDate, [
        Validators.required
      ]],
      endDate: [this.defaultEndDate, [
        Validators.required
      ]],
    });
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

  setRange(range: Range) {

    let start: momentImported.Moment = range.start;
    let end: momentImported.Moment = range.end;

    if (start.startOf('day').isBefore(this.minStartDate.startOf('day'))) {
      start = this.minStartDate;
    }

    if (start.endOf('day').isAfter(this.maxEndDate.endOf('day'))) {
      start = this.maxEndDate;
    }

    if (end.startOf('day').isBefore(this.minStartDate.startOf('day'))) {
      end = this.minStartDate;
    }

    if (end.endOf('day').isAfter(this.maxEndDate.endOf('day'))) {
      end = this.maxEndDate;
    }

    this.componentForm.get('startDate').setValue(start);
    this.componentForm.get('endDate').setValue(end);
  }

}
