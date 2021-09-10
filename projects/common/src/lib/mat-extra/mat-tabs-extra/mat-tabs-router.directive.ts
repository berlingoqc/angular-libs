import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from 'projects/common/src/lib/rxjs';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { unsubscriber } from '../../helper/unsubscriber';

/**
 * TODO , add implementation with many provider
 * to allow to store the routing info in other element that
 * in the queryParams like in localStorage.
 */

@Directive({
  selector: '[matTabsRouting]'
})
export class MatTabsRouterDirective extends OnDestroyMixin(Object) implements OnInit {

  queryParamTab = 'selectedTabItem';

  subRoute: Subscription;
  subTabChange: Subscription;

  constructor(
    private matTabGroup: MatTabGroup,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        untilComponentDestroyed(this),
        map(queryParams => queryParams[this.queryParamTab]),
        filter(item => item),
      )
      .subscribe((item) => {
        this.matTabGroup.selectedIndex = item;
      });
    this.subTabChange = this.matTabGroup.selectedIndexChange.asObservable().subscribe((index) => {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { [this.queryParamTab]: index},
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    });
  }
}
