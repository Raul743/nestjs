import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
interface ICancelNotficationRequest {
  notificationId: string;
}

type CancelNotifiicationReponse = void;
@Injectable()
export class CancelNotifiication {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    notificationId,
  }: ICancelNotficationRequest): Promise<CancelNotifiicationReponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.cancel();
    this.notificationRepository.save(notification);
  }
}
