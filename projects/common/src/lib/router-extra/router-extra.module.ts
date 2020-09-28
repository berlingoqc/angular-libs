import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnPreviousDirective } from './return-previous.directive';
import { RouterModule } from '@angular/router';
import { RouterHistoryService } from './router-history.service';
import { DisposableComponent } from './disposable';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ReturnPreviousDirective, DisposableComponent],
  exports: [ReturnPreviousDirective],
})
export class RouterExtraModule {
  static forRoot(): ModuleWithProviders<RouterExtraModule> {
    return {
      ngModule: RouterExtraModule,
      providers: [RouterHistoryService],
    };
  }
  constructor(private historyService: RouterHistoryService) { }
}
