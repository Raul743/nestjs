import { SendNotifiication } from './sendNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepositories';

describe('Send Notifiication', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotifiication(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'b fbnfdmnbmnsdbmnfdm',
      cotegory: 'fbkjfbkjbfdjhfbj',
      recipientId: 'exemple-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
  });
});
