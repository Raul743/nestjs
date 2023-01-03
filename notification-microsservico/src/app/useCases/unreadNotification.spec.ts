import { Notification } from '../entities/notification';
import { UnReadNotifiication } from './unreadNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepositories';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notificationNotFound';

describe('Unread  Notifiication', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotifification = new UnReadNotifiication(
      notificationRepository,
    );
    const notification = new Notification({
      content: new Content('Voce tem uma notificacao de amizade'),
      cotegory: 'Social',
      recipientId: 'exemple-recipientId-id',
      readAt: new Date(),
    });
    await notificationRepository.create(notification);
    await cancelNotifification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });
  it('should be able to un read non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotifification = new UnReadNotifiication(
      notificationRepository,
    );

    expect(() => {
      return cancelNotifification.execute({
        notificationId: 'fake-notificationId-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
