import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <!--The content below is only a placeholder and can be replaced.-->
        <mat-toolbar style="text-align:center; display: flex" class="content">
            <h1>@berlingoqc/ngx-* live demo</h1>
            <span style="flex-grow: 2"></span>
            <color-picker></color-picker>
        </mat-toolbar>
        <mat-drawer-container style="min-height: 100%">
            <mat-drawer mode="side" opened class="drawer">
                <mat-nav-list>
                    <a mat-list-item routerLink="/">
                        <mat-icon>home</mat-icon>
                        <span class="nav-caption">Home</span>
                    </a>
                    <a mat-list-item routerLink="/autoform">
                        <mat-icon>assignment</mat-icon>
                        <span class="nav-caption"
                            >@berlingoqc/ngx-autoform</span
                        >
                    </a>
                    <a mat-list-item routerLink="/autotable">
                        <mat-icon>table_view</mat-icon
                        ><span class="nav-caption"
                            >@berlingoqc/ngx-autotable</span
                        >
                    </a>
                    <a mat-list-item href="https://github.com/berlingoqc/angular-libs">
                        <mat-icon svgIcon="github"></mat-icon>
                        <span class="nav-caption">@berlingoqc/angular-libs</span>
                    </a>
                </mat-nav-list>
            </mat-drawer>
            <mat-drawer-content style="padding: 10px">
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
})
export class AppComponent {
    title = 'demo';

    current = '';

    constructor(
      private activatedRoute: ActivatedRoute,
      iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
    ) {
        this.current = this.activatedRoute.snapshot.queryParams.model;

        iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/github.svg'))
    }
}
