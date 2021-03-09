import { InjectionToken } from '@angular/core';

export interface PWAConfig {
    autoUpdate?: boolean;
}

export const PWA_CONFIG = new InjectionToken<PWAConfig>('pwa.config');

export const pwaConfig = {
    serviceWorker: {
        enabled: false,
        path: 'ngsw-config.json',
    },
};
