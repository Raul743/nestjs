import {
  Notification,
  INotificationProps,
} from '../../src/app/entities/notification';
import { Content } from '../../src/app/entities/content';

type Override = Partial<INotificationProps>;
export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('b fbnfdmnbmnsdbmnfdm'),
    cotegory: 'fbkjfbkjbfdjhfbj',
    recipientId: 'exemple-id-1',
    ...override,
  });
}
