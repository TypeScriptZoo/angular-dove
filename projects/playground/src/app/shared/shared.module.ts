import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';

const IE = [
  CommonModule,
];

const SHARED = [
  ListComponent,
];

@NgModule({
  declarations: [
    ... SHARED,
  ],
  imports: [
    ... IE,
  ],
  exports: [
    ... IE,
    ... SHARED,
  ]
})
export class SharedModule {}
