import { CountNotifiication } from './countRecipientNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepositories';

import { makeNotification } from '../../../test/factories/notificationFactory';

describe('Count recipients Notifiications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifification = new CountNotifiication(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'exemple-recipient-id-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'exemple-recipient-id-w' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'exemple-recipient-id-1' }),
    );

    const { count } = await countRecipientNotifification.execute({
      recipientId: 'exemple-recipient-id-1',
    });
    expect(count).toEqual(2);
  });
});
