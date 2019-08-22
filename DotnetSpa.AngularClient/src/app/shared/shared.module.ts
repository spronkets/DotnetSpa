import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerListComponent, OrderListComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [CustomerListComponent, OrderListComponent],
  providers: [],
  exports: [CustomerListComponent, OrderListComponent]
})
export class SharedModule {}
