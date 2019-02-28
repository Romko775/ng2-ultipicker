# Ultipicker: moment based datepicker
[![NPM](https://nodei.co/npm/ultipicker.png)](https://nodei.co/npm/ultipicker/)

![npm version](https://img.shields.io/npm/v/ultipicker.svg?style=flat-square)
![](https://img.shields.io/npm/l/ultipicker.svg?style=flat-square)
![](https://img.shields.io/npm/dt/ultipicker.svg?style=flat-square)
![](https://img.shields.io/github/last-commit/romko775/ng2-ultipicker.svg?style=flat-square)
![](https://img.shields.io/github/repo-size/romko775/ng2-ultipicker.svg?style=flat-square)
![](https://img.shields.io/github/languages/code-size/romko775/ng2-ultipicker.svg?style=flat-square)
![](https://img.shields.io/github/languages/count/romko775/ng2-ultipicker.svg?style=flat-square)

***
## Demo
#### Follow [https://romko775.github.io/ng2-ultipicker/](https://romko775.github.io/ng2-ultipicker/) to see how pickers look
***

## Log of changes
### Follow [https://github.com/Romko775/ng2-ultipicker/blob/master/projects/ultipicker/LOGS.md](https://github.com/Romko775/ng2-ultipicker/blob/master/projects/ultipicker/LOGS.md) to see changes
***

## Getting started
### Step 1: Install 

#### NPM
```shell
npm i ultipicker --save
```

### Step 2: Import the UltipickerModule
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UltipickerModule } from 'ultipicker'; //add this

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UltipickerModule //add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 3: Add in component html picker

### Dual picker <ng2-ultipicker-dual>

```html
<ng2-ultipicker-dual [defaultStartDate]="yourDefaultStartDate"
                     [defaultEndDate]="yourDefaultEndDate">
</ng2-ultipicker-dual>
```

#### Inputs
| Input | Type | Default | Required | Description |
| ----- | ---- | ------- | -------- | ----------- |
| minStartDate | moment.Moment | `null` | no | The minimal start date that user can select |
| maxEndDate | moment.Moment | `null` | no | The maximal end date that user can select |
| defaultStartDate | moment.Moment | `moment()` | no | The date of start date picker |
| defaultEndDate | moment.Moment | `moment()` | no | The date of end date picker |
| inputDayFormat | string | `MM-DD-YYYY` | no | The date format in which moment time transforms |
| separator | string | `' - '` | no | The separator for readonly input between dates |
| dayNames | Array<string> | `['Su', ... 'St']` | no | Can set local day names. `Order only when first day is Sunday`. First day Monday temporary not supported |
| monthNames | Array<string> | `['January', ... 'December']` | no | Can set local names for months |
| ranges | Array<Range> | See ranges | no | Can set predetermined ranges | 

#### ranges

```ts
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
```

#### Output
Works with Reactive Forms. Just add `[formControlName]`.


### Mono picker <ng2-ultipicker-mono>
```html
<ng2-ultipicker-mono   [defaultDate]="yourDefaultDate">
</ng2-ultipicker-mono>
```

#### Inputs
| Input | Type | Default | Required | Description |
| ----- | ---- | ------- | -------- | ----------- |
| minDate | moment.Moment | `null` | no | The minimal start date that user can select |
| maxDate | moment.Moment | `null` | no | The maximal end date that user can select |
| defaultDate | moment.Moment | `moment()` | no | The default date of picker |
| inputDayFormat | string | `MM-DD-YYYY` | no | The date format in which moment time transforms |
| dayNames | Array<string> | `['Su', ... 'St']` | no | Can set local day names. `Order only when first day is Sunday`. First day Monday temporary not supported |
| monthNames | Array<string> | `['January', ... 'December']` | no | Can set local names for months |
| autoClose | boolean | `false` | no | If true closes the picker when user selected the date |
| defaultSets | Array<DefaultSet> | See defaultSets| no | Can set predetermined date sets |

#### defaultSets

```ts
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
```

#### Output
Works with Reactive Forms. Just add `[formControlName]`.

### Contributor
- [Roman Yanush](https://github.com/Romko775/)

### Inspired by 
- [Vlad Loffe](https://github.com/vlio20)
- [Dan Grossman](https://github.com/dangrossman)
