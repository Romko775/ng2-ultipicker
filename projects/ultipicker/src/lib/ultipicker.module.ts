import { NgModule } from '@angular/core';
import { UltipickerComponent } from './ultipicker.component';
import { PickerBlockComponent } from './picker-block/picker-block.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [UltipickerComponent, PickerBlockComponent],
  imports: [
    CommonModule
  ],
  exports: [UltipickerComponent]
})
export class UltipickerModule { }
