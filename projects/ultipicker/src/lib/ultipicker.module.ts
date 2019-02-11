import { NgModule } from '@angular/core';
import { UltipickerComponent } from './ultipicker.component';
import { PickerBlockComponent } from './picker-block/picker-block.component';

@NgModule({
  declarations: [UltipickerComponent, PickerBlockComponent],
  imports: [
  ],
  exports: [UltipickerComponent]
})
export class UltipickerModule { }
