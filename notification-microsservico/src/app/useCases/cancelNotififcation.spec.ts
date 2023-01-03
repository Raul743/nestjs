import { Notification } from '../entities/notification';
import { CancelNotifiication } from './cancelNotifification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepositories';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notificationNotFound';

describe('Cancel  Notifiication', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotifification = new CancelNotifiication(
      notificationRepository,
    );
    const notification = new Notification({
      content: new Content('Voce tem uma notificacao de amizade'),
      cotegory: 'Social',
      recipientId: 'exemple-recipientId-id',
    });
    await notificationRepository.create(notification);
    await cancelNotifification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });
  it('should be able to cancel non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotifification = new CancelNotifiication(
      notificationRepository,
    );

    expect(() => {
      return cancelNotifification.execute({
        notificationId: 'fake-notificationId-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
