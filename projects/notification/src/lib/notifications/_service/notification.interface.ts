import { Observable } from 'rxjs';
import { NotificationD } from '../_model/notification';



export const URL_API = 'URL_API';

export abstract class INotificationService {
  abstract delete(n: NotificationD): Observable<any>;
  abstract getNotifications(): Observable<NotificationD[]>;
}
