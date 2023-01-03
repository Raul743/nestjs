import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
interface IUnReadNotficationRequest {
  notificationId: string;
}

type UnReadNotifiicationReponse = void;
@Injectable()
export class UnReadNotifiication {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    notificationId,
  }: IUnReadNotficationRequest): Promise<UnReadNotifiicationReponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.unread();
    this.notificationRepository.save(notification);
  }
}
