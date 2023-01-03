import { Content } from './content';
import { Notification } from './notification';
describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('voce tem um novo pedido de amizade'),
      cotegory: 'social',
      recipientId: 'exemple-recipiente-id',
      createAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
