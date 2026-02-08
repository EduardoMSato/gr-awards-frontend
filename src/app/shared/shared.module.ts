import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';

const PRIMENG_MODULES = [
  TableModule,
  InputTextModule,
  DropdownModule,
  ButtonModule,
  CardModule,
  InputNumberModule,
];

@NgModule({
  imports: [CommonModule, ...PRIMENG_MODULES],
  exports: [CommonModule, ...PRIMENG_MODULES],
})
export class SharedModule {}
