import { Notification } from '../entities/notification';
import { ReadNotifiication } from './readNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepositories';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notificationNotFound';

describe('read  Notifiication', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotifification = new ReadNotifiication(notificationRepository);
    const notification = new Notification({
      content: new Content('Voce tem uma notificacao de amizade'),
      cotegory: 'Social',
      recipientId: 'exemple-recipientId-id',
    });
    await notificationRepository.create(notification);
    await cancelNotifification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].createAt).toEqual(
      expect.any(Date),
    );
  });
  it('should be able to read non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotifification = new ReadNotifiication(notificationRepository);

    expect(() => {
      return cancelNotifification.execute({
        notificationId: 'fake-notificationId-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
