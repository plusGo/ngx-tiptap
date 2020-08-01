import {NgModule} from '@angular/core';
import {NgxTiptapLibComponent} from './ngx-tiptap-lib.component';
import {NzIconModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';

const NZ_ZORRO_MODULES = [NzIconModule];

@NgModule({
  declarations: [NgxTiptapLibComponent],
  imports: [
    NZ_ZORRO_MODULES,
    CommonModule
  ],
  exports: [NgxTiptapLibComponent]
})
export class NgxTiptapLibModule {
}
