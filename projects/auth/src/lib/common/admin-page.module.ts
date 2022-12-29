import {
  NgModule,
  Component,
  Directive,
  ContentChildren,
  TemplateRef,
  QueryList,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatBadgeModule } from '@angular/material/badge';
import { IDResolver } from '@berlingoqc/ngx-common';
/*
@Component({
  template: `
    {{ lol }}
    <alb-admin-page>
      <alb-top-card>
        <h2>Salut</h2>
      </alb-top-card>

      <ng-template albTopButton (albTopButtonClick)="lol = 'dd'">
       <mat-icon>delete</mat-icon>aliuttttt
      </ng-template>
      <ng-template albTopButton>
        Saliuttt>
      </ng-template>
      <ng-template albTopButton>
        Saliuttt
      </ng-template>

      <ng-template albTabSection="Juste un beau nom pour toi">
        <p>Hello my love</p>
      </ng-template>

      <ng-template albTabSection="Toi aussi un beau nom">
        <p>DAC</p>
      </ng-template>
    </alb-admin-page>
  `,
})
export class TestComponent {
  lol = '';
}
*/

const stylePage = `
.center-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 20px;
}

.main-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-botton: 50px;
}

.top-container {
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
}

.top-container > * {
  margin: 10px;
}

.left-container {
  flex-grow: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.right-container {
  flex-grow: 2;
  display: flex;
}

.expend-container {
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.action {
  min-width: 200px;
  display: flex;
}

.action mat-icon {
  align-self: center;
}

.spacer {
  height: 40px;
}

.center-items {
  display: flex;
  justify-content: center;
  align-items: center;
}

.full {
  width: 100%;
}

.full-stretch {
  max-width: 100%;
}

.card {
  min-width: 300px;
}
`;

@Component({
  selector: 'alb-top-card',
  template: '<ng-content></ng-content>',
})
export class TopCardComponent {}

@Directive({
  selector: '[albTabSection]',
})
export class TabSectionDirective {
  @Input('albTabSection') public name = 'dsadada';

  constructor(public viewRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[albTopButton]',
})
export class TopButtonDirective {
  // tslint:disable-next-line: no-output-rename
  @Output('albTopButtonClick') public buttonClick = new EventEmitter<any>();
  constructor(public viewRef: TemplateRef<any>) {}

  @Input('albTopButtonBadge') public badge: number;
}

@Component({
  selector: 'alb-admin-page',
  template: `
    <div class="main-container">
      <!-- Top container -->
      <div class="top-container">
        <div class="left-container">
          <div class="center-items" *ngFor="let b of buttons">
            <button
              mat-stroked-button
              class="action"
              [matBadge]="b.badge"
              (click)="b.buttonClick.next($event)"
            >
              <ng-container [ngTemplateOutlet]="b.viewRef"></ng-container>
            </button>
          </div>
        </div>
        <div class="right-container">
          <mat-card class="card">
            <ng-content select="alb-top-card"></ng-content>
          </mat-card>
        </div>
      </div>
      <!-- Spacer -->
      <div class="spacer"></div>
      <!-- Center container -->
      <div class="center-container">
        <mat-tab-group mat-stretch-tabs dynamicHeight class="full" [(selectedIndex)]="index">
          <mat-tab *ngFor="let t of tabs" label="{{ t.name }}">
            <ng-container [ngTemplateOutlet]="t.viewRef"></ng-container>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [stylePage],
})
export class AdminPageComponent {
  @ContentChildren(TabSectionDirective, { descendants: true }) tabs: QueryList<
    TabSectionDirective
  >;
  @ContentChildren(TopButtonDirective, { descendants: true })
  buttons: QueryList<TopButtonDirective>;

  private innerIndex = 0;

  get index() {
    return this.innerIndex;
  }
  set index(i: number) {
    this.innerIndex = i;
    localStorage.setItem(this.id, this.innerIndex.toString());
  }

  id: string;

  constructor(private resolver: IDResolver) {
    this.resolver.resolveID().subscribe((id) => {
      this.id = id;
      this.innerIndex = +(localStorage.getItem(id) ?? 0);
    });
  }
}

@NgModule({
  declarations: [
    AdminPageComponent,
    TabSectionDirective,
    TopCardComponent,
    TopButtonDirective,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  exports: [
    AdminPageComponent,
    TabSectionDirective,
    TopCardComponent,
    TopButtonDirective,
  ],
  providers: [],
})
export class AdminPageModule {}
