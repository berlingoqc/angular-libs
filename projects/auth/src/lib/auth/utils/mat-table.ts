import { MatTableDataSource } from '@angular/material/table';

export function dataSourceRemove<T = any>(
  ds: MatTableDataSource<T>,
  t: T,
  field: string
) {
  const index = ds.data.findIndex((u) => u[field] === t[field]);
  if (index > -1) {
    const array = ds.data;
    array.splice(index, 1);
    ds.connect().next(array);
  }
}
