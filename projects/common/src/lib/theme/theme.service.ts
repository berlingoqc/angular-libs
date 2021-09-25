import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Option } from './theme.model';
import { ThemeManagerService } from './theme-manager.service';

@Injectable()
export class ThemeService {
  static STORAGE_KEY = 'THEME';

  currentTheme: string;

    constructor(
        private http: HttpClient,
        private themeManager: ThemeManagerService,
    ) {}

    getThemeOptions(): Observable<Array<Option>> {
        return this.http.get<Array<Option>>('assets/options.json');
    }

    setTheme(themeToSet) {
        this.persistTheme(themeToSet);
        this.themeManager.setStyle(
            'theme',
            `assets/prebuilt-themes/${themeToSet}.css`,
        );
        this.currentTheme = themeToSet;
    }

    persistTheme(themeToSet) {
      localStorage.setItem(ThemeService.STORAGE_KEY, themeToSet);
    }

    restoreTheme() {
      const theme = localStorage.getItem(ThemeService.STORAGE_KEY);
      if (theme) this.setTheme(theme);
    }
}
