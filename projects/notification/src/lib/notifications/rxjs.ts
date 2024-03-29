import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { injector } from './global';
import { NotificationService } from './_service/notification.service';

export interface NotifyConfig {
    title?: string;
    titleFailed?: string;
    body?: (d: any) => string;
    bodyFailed?: (d: any) => string;
    disableSuccess?: boolean;
    disableError?: boolean;
}

let service: NotificationService;

export function notify<T>(config: NotifyConfig) {
    if (!service) service = injector.get(NotificationService);
    return (source: Observable<T>) => {
        return source.pipe(
            map((data) => {
                if (!config.disableSuccess) {
                    service.openNotification({
                        title: config.title ? config.title : 'Opération terminée',
                        body: config.body,
                        bodyContext: data,
                    });
                }
                return data;
            }),
            catchError((error) => {
                if (!config.disableError) {
                    service.openNotification({
                        title: config.titleFailed
                            ? config.titleFailed
                            : "Échec de l'opération",
                        body: config.bodyFailed,
                        bodyContext: error,
                    });
                }
                throw error;
            }),
        );
    };
}
