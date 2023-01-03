import { GetRecipientNotifiication } from './getRecipientNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepositories';

import { makeNotification } from '../../../test/factories/notificationFactory';

describe('Get recipients Notifiications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifification = new GetRecipientNotifiication(
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

    const { notifications } = await getRecipientNotifification.execute({
      recipientId: 'exemple-recipient-id-1',
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'exemple-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'exemple-recipient-id-1' }),
      ]),
    );
  });
});
