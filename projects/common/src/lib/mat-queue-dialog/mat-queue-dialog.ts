import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Inject, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

interface MatQueueQueueItem {
    id: string;
    component: ComponentType<any>;
    config?: MatDialogConfig<any>;
}

interface WithRef {
    ref: MatDialogRef<any, any>;
}

type MatQueueQueueItemWithRef = MatQueueQueueItem & WithRef;

@Injectable()
export class MatQueueDialog extends MatDialog {

    private queues: MatQueueQueueItem[] = [];

    private active: MatQueueQueueItemWithRef;

    private openQueue = new Subject<MatQueueQueueItemWithRef>();

    constructor(
        overlay: Overlay,
        injector: Injector,
        /**
         * @deprecated `_location` parameter to be removed.
         * @breaking-change 10.0.0
         */
        @Optional() location: Location,
        @Optional() @Inject(MAT_DIALOG_DEFAULT_OPTIONS) defaultOptions: MatDialogConfig,
        @Inject(MAT_DIALOG_SCROLL_STRATEGY) scrollStrategy: any,
        @Optional() @SkipSelf() parentDialog: MatDialog,
        overlayContainer: OverlayContainer) {
      super(overlay, injector, location, defaultOptions, scrollStrategy, parentDialog, overlayContainer);
      this.afterAllClosed.subscribe(() => {
            if (this.queues.length > 0) {
                const next = this.queues.splice(0, 1)[0] as MatQueueQueueItem & WithRef;
                next.ref = this.open(next.component, next.config);
                this.openQueue.next(next);
                this.active = next;
            } else {
                this.active = undefined;
            }
        });
    }

    /**
     * queue: Queue the opening of the dialog after all the previous have been closed
     * @param component : Component to open
     * @param config : Config pass to super.open
     * @param id : Optional id , if id already exists in the queue or if currently open dont queue and return previous reference, if not set is Date.now()
     */
    queue<T, D>(component: ComponentType<T>, config?: MatDialogConfig<D>, id?: string): Observable<MatDialogRef<T, D>> {
        if (!this.active && this.openDialogs.length === 0)  {
            this.active = {id: id ?? Date.now().toString(), component, config, ref: this.open(component, config)};
            return of(this.active.ref);
        }
        let item: MatQueueQueueItem;
        if (id) {
            if (this.active && this.active.id === id) {
                return of(this.active.ref);
            }
            item = this.queues.find(x => x.id === id);
        }
        if (!item) {
            item = {id: id ?? Date.now().toString(), component, config};
            this.queues.push(item);
        }
        return this.openQueue.asObservable().pipe(filter(openItem => openItem.id === item.id), take(1), map(openItem => openItem.ref));
    }

}