import { NgModule } from '@angular/core';
import { OfflineService } from './offline.service';

@NgModule({
  providers: [OfflineService],
})
export class OfflineModule {
  constructor(private offlineService: OfflineService) {}
}
