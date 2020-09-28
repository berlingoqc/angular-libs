import { Injectable, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  Event,
} from '@angular/router';
import { Subscription } from 'rxjs';

export class HistoryItem {
  url: string;
  queryParams?: any;
}

@Injectable()
export class RouterHistoryService implements OnDestroy {
  history: HistoryItem[] = [];

  sub: Subscription;

  constructor(private router: Router) {
    this.sub = this.router.events.subscribe((e) => this.handleRouteEvent(e));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  back(n = 1): Promise<any> {
    const item = this.history.pop();
    return this.navigateToItem(item);
  }

  navigateToItem(item: HistoryItem) {
    return this.router.navigateByUrl(item.url, {
      queryParams: item.queryParams,
    });
  }

  private handleRouteEvent(event: Event) {
    if (event instanceof NavigationStart) {
      this.history.push({
        url: this.router.url,
      });
      console.log('ITEM ADDED', this.history);
    }
    if (event instanceof NavigationEnd) {
      console.log('Navigation end', event.url, event.urlAfterRedirects);
    }
  }
}
