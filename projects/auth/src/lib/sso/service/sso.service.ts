import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SSOFullSettings } from '../model';


@Injectable()
export class SSOSettingsService {
  settingsUpdate = new Subject<SSOFullSettings>();
  settings: SSOFullSettings;
}
