import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TostrComponent } from './tostr/tostr.component';



@NgModule({
  declarations: [LoaderComponent, TostrComponent],
  imports: [
    CommonModule
  ],
  exports: [ TostrComponent ]
})
export class FeedbackCommonModule { }
