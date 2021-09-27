import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Option } from "../theme.model";
import { ThemeService } from "../theme.service";

@Component({
    selector: 'color-picker',
    template: `
        <button
            mat-icon-button
            [matMenuTriggerFor]="menu"
            aria-label="Change Theme Menu"
        >
            <mat-icon>palette</mat-icon>
        </button>

        <mat-menu #menu="matMenu">
            <button
                *ngFor="let option of options$ | async"
                [disabled]="option.value === themeService.currentTheme"
                mat-menu-item
                (click)="changeTheme(option.value)"
            >
                <mat-icon role="img" svgicon="theme-example" aria-hidden="true">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="100%"
                        height="100%"
                        viewBox="0 0 80 80"
                        fit=""
                        preserveAspectRatio="xMidYMid meet"
                        focusable="false"
                    >
                        <defs>
                            <path
                                d="M77.87 0C79.05 0 80 .95 80 2.13v75.74c0 1.17-.95 2.13-2.13 2.13H2.13C.96 80 0 79.04 0 77.87V2.13C0 .95.96 0 2.13 0h75.74z"
                                id="a"
                            ></path>
                            <path
                                d="M54 40c3.32 0 6 2.69 6 6 0 1.2 0-1.2 0 0 0 3.31-2.68 6-6 6H26c-3.31 0-6-2.69-6-6 0-1.2 0 1.2 0 0 0-3.31 2.69-6 6-6h28z"
                                id="b"
                            ></path>
                            <path d="M0 0h80v17.24H0V0z" id="c"></path>
                        </defs>
                        <use
                            xlink:href="#a"
                            [attr.fill]="option.backgroundColor"
                        ></use>
                        <use
                            xlink:href="#b"
                            [attr.fill]="option.buttonColor"
                        ></use>
                        <use
                            xlink:href="#c"
                            [attr.fill]="option.headingColor"
                        ></use>
                    </svg>
                </mat-icon>
                <span>{{ option.label }}</span>
            </button>
        </mat-menu>
    `,
})
export class ThemePickerComponent {
    options$: Observable<Array<Option>>;

    constructor(public readonly themeService: ThemeService) {
      this.options$ = this.themeService.getThemeOptions();
    }

    changeTheme(themeToSet) {
      this.themeService.setTheme(themeToSet);
    }
}
