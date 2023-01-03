import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notificationRepository';

interface ISendNotficationRequest {
  recipientId: string;
  content: string;
  cotegory: string;
}

interface ISendNotifiicationReponse {
  notification: Notification;
}
@Injectable()
export class SendNotifiication {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    content,
    cotegory,
    recipientId,
  }: ISendNotficationRequest): Promise<ISendNotifiicationReponse> {
    const notification = new Notification({
      content: new Content(content),
      cotegory,
      recipientId,
    });

    await this.notificationRepository.create(notification);
    return {
      notification,
    };
  }
}
