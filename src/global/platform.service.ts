import { inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private _Platform = inject(Platform);

  isMobilePlatform() {
    return this._Platform.is('ios') || this._Platform.is('android');
  }
}
