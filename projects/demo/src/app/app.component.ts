import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'projects/common/src/public-api';

@Component({
    selector: 'app-root',
    template: `
        <!--The content below is only a placeholder and can be replaced.-->
        <mat-toolbar style="text-align:center; display: flex" class="content">
            <h1>@berlingoqc/ngx-* live demo</h1>
            <button (click)="(sideBarOpen = !sideBarOpen)">
              Hide
            </button>
            <span style="flex-grow: 2"></span>
            <color-picker></color-picker>
        </mat-toolbar>
        <mat-drawer-container style="min-height: 100%">
            <mat-drawer mode="side" [opened]="sideBarOpen" class="drawer">
                <mat-nav-list>
                    <a mat-list-item routerLink="/">
                        <mat-icon>home</mat-icon>
                        <span class="nav-caption">Home</span>
                    </a>
                    <a mat-list-item routerLink="/autoform">
                        <mat-icon>assignment</mat-icon>
                        <span class="nav-caption"
                            >@berlingoqc/ngx-autoform demo</span
                        >
                    </a>
                    <a mat-list-item routerLink="/autoform/builder">
                        <mat-icon>assignment</mat-icon>
                        <span class="nav-caption"
                            >@berlingoqc/ngx-autoform builder</span
                        >
                    </a>
                    <a mat-list-item href="/assets/documentation-autoform/index.html">
                        <mat-icon>assignment</mat-icon>
                        <span class="nav-caption"
                            >@berlingoqc/ngx-autoform documentation</span
                        >
                    </a>

                    <a mat-list-item href="https://github.com/berlingoqc/angular-libs">
                        <mat-icon svgIcon="github"></mat-icon>
                        <span class="nav-caption">@berlingoqc/angular-libs</span>
                    </a>
                </mat-nav-list>
            </mat-drawer>
            <mat-drawer-content style="height: 100%; padding: 10px">
                <router-outlet></router-outlet>
            </mat-drawer-content>
        </mat-drawer-container>
    `,
    styles: [
        `
            .drawer {
                width: 20%;
            }
        `,
    ],
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'demo';

    current = '';

    sideBarOpen = true;

    constructor(
      private activatedRoute: ActivatedRoute,
      private themeService: ThemeService,
      iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
    ) {
        this.themeService.restoreTheme();
        this.current = this.activatedRoute.snapshot.queryParams.model;

        iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/github.svg'))
    }
}
