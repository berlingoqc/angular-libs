import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Option } from './theme.model';
import { ThemeManagerService } from './theme-manager.service';

@Injectable()
export class ThemeService {
    constructor(
        private http: HttpClient,
        private themeManager: ThemeManagerService,
    ) {}

    getThemeOptions(): Observable<Array<Option>> {
        return this.http.get<Array<Option>>('assets/options.json');
    }

    setTheme(themeToSet) {
        this.themeManager.setStyle(
            'theme',
            `assets/prebuilt-themes/${themeToSet}.css`,
        );
    }
}
