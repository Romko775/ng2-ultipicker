import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as momentImported from 'moment';
import {unitOfTime} from 'moment';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import {fromEvent, Subscription} from 'rxjs';

const moment = momentImported;

class DefaultSet {
  key: string;
  value: momentImported.Moment;
}

@Component({
  selector: 'ng2-ultipicker-mono',
  templateUrl: './ultipicker-mono.component.html',
  styleUrls: ['./ultipicker-mono.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UltipickerMonoComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class UltipickerMonoComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  @ViewChild('pickerInput') pickerInput: ElementRef;

  @Input() minDate: momentImported.Moment = null;
  @Input() maxDate: momentImported.Moment = null;
  @Input() defaultDate: momentImported.Moment = moment();
  mode: unitOfTime.StartOf = 'day';
  @Input() inputDayFormat = 'MM-DD-YYYY';
  inputMonthFormat = 'MM-YYYY';

  @Input() autoClose = false;

  @Input() dayNames;
  @Input() monthNames;

  @Input() defaultSets: Array<DefaultSet> = [
    {
      key: 'Today',
      value: moment().startOf('day')
    },
    {
      key: 'Yesterday',
      value: moment().subtract(1, 'day').startOf('day')
    },
    {
      key: 'Start of week',
      value: moment().startOf('week')
    },
    {
      key: 'Start of month',
      value: moment().startOf('month')
    }
  ];

  dayMask: string;
  monthMask: string;
  private regexD;

  pickerVisibility = false;

  memoDate: momentImported.Moment = moment();

  componentForm: FormGroup;
  componentFormSub: Subscription;
  private propagateChange: (_: any) => {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.memoDate = this.defaultDate;

    if (this.mode !== 'day') {
      this.monthMask = this.inputMonthFormat.replace(/\w/g, '9');
      this.regexD = new RegExp(this.monthMask.replace(/\W/g, '\\W').replace(/\d/g, '\\d'));
    } else {
      this.dayMask = this.inputDayFormat.replace(/\w/g, '9');
      this.regexD = new RegExp(this.dayMask.replace(/\W/g, '\\W').replace(/\d/g, '\\d'));
    }

    this.componentForm = this.fb.group({
      selectedDate: [this.defaultDate]
    });

    this.componentFormSub = this.componentForm.valueChanges.subscribe(() => {
      this.fireChanges();
    });

    fromEvent(this.pickerInput.nativeElement, 'keyup').subscribe(() => {
      const val = this.pickerInput.nativeElement.value;
      if (this.regexD.test(this.pickerInput.nativeElement.value)) {

        const obj: DefaultSet = {
          key: 'key-up',
          value: moment(val, [this.mode === 'day' ? this.inputDayFormat : this.inputMonthFormat])
        };

        this.setDefault(obj);
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
      const sMask = new Inputmask({
        mask: this.mode === 'day' ? this.dayMask : this.monthMask,
        placeholder: '\u2000'
      });
      sMask.mask(this.pickerInput);
    });
  }


  setDate(date: momentImported.Moment) {
    this.componentForm.get('selectedDate').setValue(date);

    if (this.autoClose) {
      this.closePicker();
    }
  }

  setDefault(defaultSet: DefaultSet) {
    let date = defaultSet.value;

    if (date.startOf('day').isBefore(this.minDate.startOf('day'))) {
      date = this.minDate.clone();
    }

    if (date.endOf('day').isAfter(this.maxDate.endOf('day'))) {
      date = this.maxDate.clone();
    }

    this.componentForm.get('selectedDate').setValue(date);

  }

  get formatDate() {
    return moment(this.getValue('selectedDate')).format(this.mode === 'day' ? this.inputDayFormat : this.inputMonthFormat);
  }

  getValue(val: string) {
    return this.componentForm.get(val).value;
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
      this.propagateChange(this.componentForm.get('selectedDate').value);
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
