import { AsyncPipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { DataResolver, resolveData } from './data-resolver';

/**
 * Pipe pour resolve une donnée de type DataResolver
 */
@Pipe({
  name: 'dataResolver',
})
export class DataResolverPipe extends AsyncPipe {
  transform<T>(data: DataResolver<T>): T {
    return super.transform(resolveData(data));
  }
}
