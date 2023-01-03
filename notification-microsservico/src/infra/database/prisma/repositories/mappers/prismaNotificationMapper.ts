import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '../../../../../app/entities/notification';
import { Content } from '../../../../../app/entities/content';
export class PrismaNotificationMappers {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      cotegory: notification.cotegory,
      contenet: notification.content,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createAt,
    };
  }
  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        cotegory: raw.cotegory,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        cancelAt: raw.canceled,
        createAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
