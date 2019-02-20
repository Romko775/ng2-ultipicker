import {Component, forwardRef, Input, OnInit} from '@angular/core';
import * as momentImported from 'moment';
import {unitOfTime} from 'moment';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

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
  ]
})
export class UltipickerComponent implements OnInit {

  @Input() minStartDate: momentImported.Moment = null;
  @Input() maxEndDate: momentImported.Moment = null;
  @Input() defaultStartDate: momentImported.Moment = moment();
  @Input() defaultEndDate: momentImported.Moment = moment();
  @Input() mode: unitOfTime.StartOf = 'day';

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
    this.componentForm = this.fb.group({
      startDate: [this.defaultStartDate, [
        Validators.required
      ]],
      endDate: [this.defaultEndDate, [
        Validators.required
      ]],
    });

    // setInterval(() => {
    //   console.log(this.componentForm.value);
    // }, 3000);
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

  get calcRangeStartMin(): momentImported.Moment {
    return moment(this.componentForm.get('startDate').value);
  }

  get calcRangeEndMax(): momentImported.Moment {
    return moment(this.componentForm.get('endDate').value);
  }

  setRange(range: Range) {
    this.componentForm.get('startDate').setValue(range.start);
    this.componentForm.get('endDate').setValue(range.end);
  }

}
