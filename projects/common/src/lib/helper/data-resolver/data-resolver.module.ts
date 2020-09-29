import { NgModule } from '@angular/core';
import { DataResolverPipe } from './data-resolver.pipe';

/**
 * DataResolverModule fournis pipes
 */
@NgModule({
  declarations: [DataResolverPipe],
  exports: [DataResolverPipe],
})
export class DataResolverModule {}
