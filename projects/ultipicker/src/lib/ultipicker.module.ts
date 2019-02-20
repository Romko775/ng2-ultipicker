import { NgModule } from '@angular/core';
import { UltipickerComponent } from './ultipicker.component';
import { PickerBlockComponent } from './picker-block/picker-block.component';
import {CommonModule} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

library.add(far, fas);

@NgModule({
  declarations: [UltipickerComponent, PickerBlockComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UltipickerComponent,
    FontAwesomeModule
  ]
})
export class UltipickerModule { }
